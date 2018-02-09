import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyCFfLlC1zGYCxM4TtbEBOU9nvcOimywlok",
  authDomain: "pwatraining-001.firebaseapp.com",
  databaseURL: "https://pwatraining-001.firebaseio.com",
  projectId: "pwatraining-001",
  storageBucket: "pwatraining-001.appspot.com",
  messagingSenderId: "134436436747"
};
firebase.initializeApp(config);

export default {
  database: firebase.database()
}
