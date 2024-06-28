import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useState } from 'react';

//path to background image shown on the start screen
const bgImage = require('../img/bgimage.png');

//component that renders the start screen
const Start = ({ navigation }) => {

  // name that user has typed in input field
  const [name, setName] = useState('');

  // color that is selected by user
  const [background, setBackground] = useState('');

  //available colors to pick from on start screen
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.backgroundImage}>
        <Text style={styles.headline}>Chat App</Text>
        <View style={styles.whiteBox}>

          {/* show input field */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />

          {/* show options to choose color */}
          <Text style={styles.chooseBgColor}>Choose Background Color</Text>
          <View style={styles.colorCirclesContainer}>
            {
              colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color },
                    background === color && styles.selectedColor
                  ]}
                  onPress={() => setBackground(color)}
                />
              ))
            }
          </View>

          {/* button to start chatting */}
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => navigation.navigate('Chat', { name: name, background: background })}
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 10,
    height: 50,
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    opacity: 50
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover' // or 'contain', depending on your needs
  },
  headline: {
    flex: 1,
    margin: 40,
    fontSize: 45,
    color: '#fff',
    fontWeight: '600'
  },
  whiteBox: {
    backgroundColor: '#fff',
    width: '88%',
    height: '44%',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 25
  },
  chooseBgColor: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    opacity: 100
  },
  chatButton: {
    backgroundColor: '#757083',
    width: '88%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  colorCirclesContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5
  },
  selectedColor: {
    borderColor: '#c0c0c0',
    borderWidth: 4,
  },
});

export default Start;