const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "project0sloth-firebase.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


async function getUserDocument(userId) {
    try {
      const doc = await admin.firestore().collection('users').doc(userId).get();
      if (!doc.exists) {
        console.log('No such document!');
        return null;
      } else {
        // console.log(doc.data());
        return doc.data();
      }
    } catch (error) {
      console.error('Error getting user document:', error);
      throw error; // Propagate the error to the caller
    }
  }

// getUserDocument("Lk0NuDFr5NOJkrqi3WwWa8RqXME3")

module.exports = getUserDocument;
  
