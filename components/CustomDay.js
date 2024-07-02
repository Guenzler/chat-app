import React from 'react';
import { StyleSheet } from 'react-native';
import { Day } from 'react-native-gifted-chat';

const CustomDay = (props) => {
  return (
    <Day
      {...props}
      containerStyle={styles.container}
      textStyle={styles.text}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // Customize the container style 
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  text: {
    color: 'white', // Change the font color to white
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CustomDay;
