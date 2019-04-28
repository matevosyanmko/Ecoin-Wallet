import app from "firebase/app";
import "firebase/auth";

import "firebase/firestore";

const config = {
  apiKey: "AIzaSyA44koLkNR1BAeP_Xjsw02ITMR2putbeUI",
  authDomain: "ecoin-325b2.firebaseapp.com",
  databaseURL: "https://ecoin-325b2.firebaseio.com",
  projectId: "ecoin-325b2",
  storageBucket: "ecoin-325b2.appspot.com",
  messagingSenderId: "411180962121"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.db.settings({
      timestampsInSnapshots: true
    });
  }
  // auth functions
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => {
    this.auth.signOut();
  };
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
  // db functions

  // paymentHistory = url => this.db.ref(url);
}

export default Firebase;
