import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomSystemMessage = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.currentMessage.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust background color 
  },
  text: {
    color: 'white', // Change the font color to white
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CustomSystemMessage;

