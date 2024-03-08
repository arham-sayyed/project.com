const path = require('path');
const validateCookie = require(path.join(__dirname, 'cookieValidation'));

function validateInputPageData(inputJson) {
    try {
        const referenceJson = {
            "body": {
                "bodybgColor": "#ffffff"
            },
            "h1": {
                "h1bgColor": "#ffffff",
                "h1textColor": "#000000",
                "border_h1": "none"
            },
            "form": {
                "formbgColor": "#ffffff",
                "formTextColor": "#000000",
                "border_form": "none"
            }
        }
        // Check if all keys from referenceJson are present in inputJson
        const allKeysPresent = Object.keys(referenceJson).every(key => key in inputJson);

        return allKeysPresent;
    } catch (error) {
        return false;
    }
}

exports.renderInputPage = async (req, res) => {
    const userUID = req.cookies.userUID;
    const authorized = validateCookie(userUID);

    if (authorized) {
        res.render('input');
    } else {
        res.status(401).render('401')
    }
}


exports.postInputPageData = async (req, res) => {
    const pageData = req.body
    const isValid = validateInputPageData(pageData);
    const userUID = req.cookies.userUID;
    
    const authorized = await validateCookie(userUID);

    if (isValid && authorized) {
        
        res.render(path.join(__dirname, "..",  "templates", "input.ejs"), pageData, (err, html) => {
            if (err) {
                console.log('Error rendering EJS: ', err);
                res.status(500).send('Error rendering EJS');
            } else {
                res.set({
                    'Content-Type':'text/html',
                    'Content-Disposition': 'attachment; filename="input.html"'
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
    res.redirect('/input');
}