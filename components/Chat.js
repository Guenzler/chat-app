import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// use CustomSystemMessage and CustomDay to customize the appeareance of system messages
import CustomSystemMessage from './CustomSystemMessage';
import CustomDay from './CustomDay';

const Chat = ({ isConnected, db, route, navigation }) => {

    //state messages stores all messages
    const [messages, setMessages] = useState([]);

    //get users name, userID and preferred background color from route.params
    const { name, background, userID } = route.params;

    //write messages to cache
    const writeMessagesToCache = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

    //load messages from cache
    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    let unsubMessages;

    useEffect(() => {

        //set the title of the page to the name of the user
        navigation.setOptions({ title: name });

        if (isConnected === true) {

            // unregister current onSnapshot() listener to avoid registering multiple 
            // listeners when useEffect code is re-executed.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            // get messages from database
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

            unsubMessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach(doc => {
                    newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
                });
                writeMessagesToCache(newMessages);
                setMessages(newMessages);
            });

        } else loadCachedMessages();

        // Clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);


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
                renderInputToolbar={renderInputToolbar}
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