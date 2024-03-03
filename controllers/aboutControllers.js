const path = require('path');
const validateCookie = require(path.join(__dirname, 'cookieValidation'));
const firebaseModel = require(path.join(__dirname, '..', 'models', 'firebase-firestore'));

function validateAboutPageData(inputJson) {
    try {
        const referenceJson = {
            "body": {
                "bodybgColor": "#ffffff"
            },
            "name": {
                "nameTextColor": "#000000",
                "nameBgColor": "#ffffff",
                "nameBorderStyle": "none"
            },
            "list": {
                "listTextColor": "#000000",
                "listBgColor": "#ffffff",
                "listBorderStyle": "none",
                "listType": "ul"
            }
        }

        // Check if all keys from referenceJson are present in inputJson
        const allKeysPresent = Object.keys(referenceJson).every(key => key in inputJson);

        return allKeysPresent;
    } catch (error) {
        return false;
    }
}

exports.renderAboutPage = async (req, res) => {
    const userUID = req.cookies.userUID;
    const authorized = await validateCookie(userUID);

    if (authorized) {
        const generalData = await firebaseModel.getUserDocument(userUID);
        const renderAboutPageData = generalData.index.general;

        // Replace the key "class" with "className"
        renderAboutPageData.className = renderAboutPageData.class;
        delete renderAboutPageData.class;
        
        console.log(renderAboutPageData);
        res.render('about', renderAboutPageData);
    } else {
        res.status(401).render('401');
    }
}




exports.postAboutPageData = async (req, res) => {
    const pageData = req.body;
    const isValid = validateAboutPageData(pageData);
    const userUID = req.cookies.userUID;
    const authorized = await validateCookie(userUID);

    if (isValid && authorized) {
        
        let generalData = await firebaseModel.getUserDocument(userUID);

        // Replace the key "class" with "className"
        generalData.index.general.className = generalData.index.general.class;
        delete generalData.index.general.class;

        const renderAboutPageData = Object.assign({}, generalData, pageData)
        // console.log(renderAboutPageData);

        res.render(path.join(__dirname, "..", "templates", "about.ejs"), renderAboutPageData, (err, html) => {
            if (err) {
                console.log('Error rendering EJS: ', err);
                res.status(500).send('Error rendering EJS');
            } else {
                
                // console.log();

                res.set({
                    'Content-Type': 'text/html',
                    'Content-Disposition': 'attachment; filename="about.html"'
                });
                // console.log(html);
                res.send(html)
            }
        })

    } else {
        res.status(400).send({message: 'bad request!'});
    }
} 





exports.methodNotAllowed = (req, res) => {
    res.status(405).render('405.ejs');
}

exports.redirect = (req, res) => {
    res.redirect('/about');
}