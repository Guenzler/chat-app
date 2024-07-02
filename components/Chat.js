import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat } from "react-native-gifted-chat";

// use CustomSystemMessage and CustomDay to customize the appeareance of system messages
import CustomSystemMessage from './CustomSystemMessage';
import CustomDay from './CustomDay';

const Chat = ({ route, navigation }) => {
    //state messages stores all messages
    const [messages, setMessages] = useState([]);

    //get users name and preferred background color from route.params
    const { name, background } = route.params;

    // set the users name as page title
    useEffect(() => {

        //set the title of the page to the name of the user
        navigation.setOptions({ title: name });

        //initialize messages with a static message and a system message
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://picsum.photos/140/140",
                },
            },
            {
                _id: 2,
                text: name + ' has entered the chat',
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    //when a new message is sent, add it to all other messages stored in the state messages
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
                renderSystemMessage={(props) => <CustomSystemMessage {...props} />}
                renderDay={(props) => <CustomDay {...props} />}
            />

            {/* make sure keyboard doesnt hide input field */}
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