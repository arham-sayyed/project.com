const path = require('path');
const firebaseModel = require(path.join(__dirname, '..' , 'models', 'firebase-firestore'));


async function validateUserCookie(uid) {
    if (!uid) {
        // res.status(401).render('401.ejs');
        return false
    } else {
        const userExists = await firebaseModel.checkIfUserExists(uid);
        // console.log(userExists)
        
        if (userExists) {
            // res.render('home', { wikiname: 'sloth', name: 'arham' });
            return true
        } else {
            // res.status(401).render('401.ejs');
            return false
        }
    }
}

module.exports = validateUserCookie;