const path = require('path');
const firebaseModel = require(path.join(__dirname, '..' , 'models', 'firebase-firestore'));
const validateCookie = require(path.join(__dirname, 'cookieValidation'));


exports.renderHomePage = async (req, res) => {

    const userUID = req.cookies.userUID; 
    const authorized = await validateCookie(userUID);

    if (authorized) {
        res.render('home', { wikiname: 'sloth', name: 'arham' });
    } else {
        res.status(401).render('401.ejs');
    }
}

// module.exports = {renderHomePage};