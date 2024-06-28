import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

const Chat = ({ route, navigation }) => {

    //get users name and preferred background color from route.params
    const { name, background } = route.params;

    // set the users name as page title
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Text style={styles.text}>Hi {name}! Welcome to the chat</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default Chat;