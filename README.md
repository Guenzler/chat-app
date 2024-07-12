# React Native Mobile Chat App

A chat app for mobile devices using React Native. Users can chat in real-time, send images and share their location.  

## Key Features

Users can input their name and choose chat background color  
Anonymous authentication, no login necessary  
Chat interface displaying previous messages, input field and submit button  
Option to open additional menu that allows for sending images and location  
Offline capabilities  

## Technologies used

React Native  
Expo  
Android Studio for testing  
Gifted Chat  
Google Firebase/Firestore    

## Dependencies

"@react-native-async-storage/async-storage": "^1.23.1"  
"@react-navigation/native": "^6.1.17"  
"@react-navigation/native-stack": "^6.9.26"  
"expo": "~51.0.14"  
"expo-status-bar": "~1.12.1"  
"firebase": "^10.3.1"  
"react": "18.2.0"  
"react-native": "0.74.2"  
"react-native-dotenv": "^3.4.11"  
"react-native-gifted-chat": "^2.4.0"  
"react-native-safe-area-context": "4.10.1"  
"react-native-screens": "3.31.1"  
"@react-native-community/netinfo": "11.3.1"  
"expo-image-picker": "~15.0.7"  
"expo-location": "~17.0.1"  
"react-native-maps": "1.14.0"  

## Development Dependencies

@babel/core: ^7.20.0   

## Installation Guide

Node.js version 20 is required  
Clone repository and install in your project folder  

### Firebase

This project requires a Firestore database  
Create account with Google Firebase  
Create a project, build a Firestore database and request storage  
Change rules of Firestore database and storage to: allow read, write: if true  
Configure the app on the Firebase console and copy your firebase configuration details  
Put your firebase configuration details in a file named .env in root folder of project  
On Firebase console, enable anonymous authentication for your app  

### Testing
Testing can be done with emulators: use Android Studio for emulating android devices or Xcode (Mac only) for iOS devices  
Expo allows to test with your mobile device: download the app "Expo Go" on your device, create an account with Expo and login into your account  
Once the project is built and served with Expo, you can open the app within the Expo Go app 

### Starting project

Using terminal, go to project folder and type  
npx expo start  
