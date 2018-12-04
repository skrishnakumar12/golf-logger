import firebase from 'firebase';

// Setup firebase credentials
var config = {
    apiKey: "AIzaSyBTe_94ejwFML0VQlGfQwLnMXGHUh0jimc",
    authDomain: "golf-logger-3dce5.firebaseapp.com",
    databaseURL: "https://golf-logger-3dce5.firebaseio.com",
    projectId: "golf-logger-3dce5",
    storageBucket: "golf-logger-3dce5.appspot.com",
    messagingSenderId: "1046893789178"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;