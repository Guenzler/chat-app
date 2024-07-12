import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from 'react-native-maps';

// use CustomSystemMessage and CustomDay to customize the appeareance of system messages
import CustomSystemMessage from './CustomSystemMessage';
import CustomDay from './CustomDay';

import CustomActions from './CustomActions';

const Chat = ({ isConnected, db, storage, route, navigation }) => {

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

            // reference to collection on firestore
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

            //attach listener to collection
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

    //render menu for additional options for sending images and location
    const renderCustomActions = (props) => {
        return <CustomActions storage={storage} userID={userID} {...props} />;
    };

    //define map view in case user sends location
    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
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
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
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