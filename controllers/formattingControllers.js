const path = require('path');
const validateCookie = require(path.join(__dirname, 'cookieValidation'));

function validateFormattingPageData(formattingJson) {
    try {
        const referenceJson = {
            "bgColor": "#ffffff",
            "textColor": "#000000"
        }
        // Check if all keys from referenceJson are present in formattingJson
        const allKeysPresent = Object.keys(referenceJson).every(key => key in formattingJson);

        return allKeysPresent;
    } catch (error) {
        return false;
    }
}

exports.renderFormattingPage = async (req, res) => {
    const userUID = req.cookies.userUID;
    const authorized = validateCookie(userUID);

    if (authorized) {
        res.render('formatting');
    } else {
        res.status(401).render('401')
    }
}


exports.postFormattingPageData = async (req, res) => {
    const pageData = req.body
    const isValid = validateFormattingPageData(pageData);
    const userUID = req.cookies.userUID;
    
    const authorized = await validateCookie(userUID);

    if (isValid && authorized) {
        
        res.render(path.join(__dirname, "..",  "templates", "formatting.ejs"), pageData, (err, html) => {
            if (err) {
                console.log('Error rendering EJS: ', err);
                res.status(500).send('Error rendering EJS');
            } else {
                res.set({
                    'Content-Type':'text/html',
                    'Content-Disposition': 'attachment; filename="formatting.html"'
                });

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
    res.redirect('/formatting');
}