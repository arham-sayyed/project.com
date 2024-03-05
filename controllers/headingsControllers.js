const path = require('path');
const validateCookie = require(path.join(__dirname, 'cookieValidation'));

function validateHeadingsPageData(inputJson) {
    try {
        const referenceJson = {
            "h1": {
                "textColor": "#000000",
                "bgColor": "#ffffff",
                "borderColor": "#000000",
                "borderStyle": "none"
            },
            "h2": {
                "textColor": "#000000",
                "bgColor": "#ffffff",
                "borderColor": "#000000",
                "borderStyle": "none"
            },
            "h3": {
                "textColor": "#000000",
                "bgColor": "#ffffff",
                "borderColor": "#000000",
                "borderStyle": "none"
            },
            "h4": {
                "textColor": "#000000",
                "bgColor": "#ffffff",
                "borderColor": "#000000",
                "borderStyle": "none"
            },
            "h5": {
                "textColor": "#000000",
                "bgColor": "#ffffff",
                "borderColor": "#000000",
                "borderStyle": "none"
            },
            "h6": {
                "textColor": "#000000",
                "bgColor": "#ffffff",
                "borderColor": "#000000",
                "borderStyle": "none"
            },
            "body": {
                "bgColor": "#ffffff"
            }
        }
        // Check if all keys from referenceJson are present in inputJson
        const allKeysPresent = Object.keys(referenceJson).every(key => key in inputJson);

        return allKeysPresent;
    } catch (error) {
        return false;
    }
}

exports.renderHeadingsPage = async (req, res) => {
    const userUID = req.cookies.userUID;
    const authorized = validateCookie(userUID);

    if (authorized) {
        res.render('headings');
    } else {
        res.status(401).render('401')
    }
}


exports.postHeadingsPageData = async (req, res) => {
    const pageData = req.body
    const isValid = validateHeadingsPageData(pageData);
    const userUID = req.cookies.userUID;
    
    const authorized = await validateCookie(userUID);

    if (isValid && authorized) {
        
        res.render(path.join(__dirname, "..",  "templates", "headings.ejs"), pageData, (err, html) => {
            if (err) {
                console.log('Error rendering EJS: ', err);
                res.status(500).send('Error rendering EJS');
            } else {
                res.set({
                    'Content-Type':'text/html',
                    'Content-Disposition': 'attachment; filename="headings.html"'
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
    res.redirect('/headings');
}