const admin = require("firebase-admin");
const path = require("path");

// const serviceAccount = require(path.join(__dirname, "project0sloth-firebase.json"));

const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
  "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
};

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

// getUserDocument("NnaKb4l4ZLeD71RmIdJcmnXrBv43")


// Function to check if user exists
async function checkIfUserExists(uid) {
  try {
    const userRecord = await admin.auth().getUser(uid);
    // User exists
    // console.log('User exists:', userRecord.toJSON());
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

module.exports = {
  getUserDocument,
  checkIfUserExists
};
  
