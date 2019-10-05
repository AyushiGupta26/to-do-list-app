import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBLppgJy78Vz7gAVI2XXobcnIAbdAknRjk",
  authDomain: "to-do-list-28458.firebaseapp.com",
  databaseURL: "https://to-do-list-28458.firebaseio.com",
  projectId: "to-do-list-28458",
  storageBucket: "",
  messagingSenderId: "122916625370",
  appId: "1:122916625370:web:d6dc253dad86bc5e"
};

let fire = firebase.initializeApp(config);

export default fire;