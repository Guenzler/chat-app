import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

// use CustomSystemMessage and CustomDay to customize the appeareance of system messages
import CustomSystemMessage from './CustomSystemMessage';
import CustomDay from './CustomDay';

const Chat = ({ db, route, navigation }) => {

    //state messages stores all messages
    const [messages, setMessages] = useState([]);

    //get users name, userID and preferred background color from route.params
    const { name, background, userID } = route.params;

    useEffect(() => {

        //set the title of the page to the name of the user
        navigation.setOptions({ title: name });

        // get messages from database
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

        const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
                newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
            });
            setMessages(newMessages);
        });
        // Clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, []);

    //when a new message is sent, store it in database
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
                }}
                renderSystemMessage={(props) => <CustomSystemMessage {...props} />}
                renderDay={(props) => <CustomDay {...props} />}
            />

            {/* make sure keyboard does not hide input field */}
            {(Platform.OS === 'android' || Platform.OS === 'ios') ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;