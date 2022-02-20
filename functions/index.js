const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const {firestore} = require("firebase-admin");
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase");
});

exports.addUser = functions.auth.user().onCreate((user) => {
  // Below Code Runs every time when a new user is created
  functions.logger.info("New User Created with = "+user.displayName);
  const usersRef = admin.firestore().collection("users");
  return usersRef.doc(user.uid).set({
    displayName: user.displayName,
    emojis: "\u263A",
    createdDate: firestore.Timestamp.now(),
  });
});
