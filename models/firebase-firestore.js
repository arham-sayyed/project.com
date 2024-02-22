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


// Function to check if user exists
async function checkIfUserExists(uid) {
  try {
    const userRecord = await admin.auth().getUser(uid);
    // User exists
    console.log('User exists:', userRecord.toJSON());
    return true;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      // User does not exist
      console.log('User does not exist');
      return false;
    } else {
      // Other error handling
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
}

// Example usage
// const uid = 'mabMAh1mOWZMQryiNb5OsGufmqh1'; // replace with the UID you want to check
// checkIfUserExists(uid)
//   .then((exists) => {
//     if (exists) {
//       console.log('User exists!');
//     } else {
//       console.log('User does not exist!');
//     }
//   })
//   .catch((error) => {
//     console.error('Error checking user existence:', error);
//   });

module.exports = getUserDocument;
  
