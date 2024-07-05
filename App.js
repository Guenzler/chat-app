// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

// import React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

//define the navigation and the initial page
const App = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyCBjOT1cSBT7U8aWPGiUx6RcqN2s36iIM0",
    authDomain: "chat-app-225b4.firebaseapp.com",
    projectId: "chat-app-225b4",
    storageBucket: "chat-app-225b4.appspot.com",
    messagingSenderId: "267130210972",
    appId: "1:267130210972:web:2c53edeba18139df8ebb59"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //provide async storage to firebase auth
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        {/* pass db to Chat component */}
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
