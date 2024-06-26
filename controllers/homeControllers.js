const path = require('path');
const validateCookie = require(path.join(__dirname, 'cookieValidation'));
const firebaseModel = require(path.join(__dirname, '..', 'models', 'firebase-firestore'));
const extractWikiContent = require(path.join(__dirname, '..', 'models', 'extractWikiContent'));

function validateHomePageData(inputJson) {
    try {
        const referenceJson = {
            project_name: {
                h1textColor: '#000000',
                h1bgColor: '#ffffff',
                border_h1: 'none'
            },
            hr: {
                hrColor: '#000000',
                hrSize: '5',
                hrWidth: '100'
            },
            body: {
                bodybgColor: '#ffffff'
            },
            main_container: {
                mainBgColor: '#ffffff',
                main_h1textColor: '#000000',
                main_h1bgColor: '#ffffff',
                paraTextColor: '#000000',
                paraBgColor: '#ffffff',
                borderMain: 'solid'
            },
            links: {
                A_textColor: '#000000',
                A_bgColor: '#ffffff'
            }
        };

        // Check if all keys from referenceJson are present in inputJson
        const allKeysPresent = Object.keys(referenceJson).every(key => key in inputJson);

        return allKeysPresent;
    } catch (error) {
        return false;
    }
}

exports.renderHomePage = async (req, res) => {

    const userUID = req.cookies.userUID;
    const authorized = await validateCookie(userUID);
    
    if (authorized) {
    const generalData = await firebaseModel.getUserDocument(userUID);
    
    const wikiData = await extractWikiContent(generalData.index.general.wikiURL);

    const homePageData = {
        title: wikiData.title,
        name: generalData.index.general.name,
        para1: wikiData.para1,
        image: wikiData.wikiImage,
        para2: wikiData.para2
    }
    // console.log(homePageData);
        res.render('home', { title: homePageData.title, name: homePageData.name, para1: homePageData.para1, image: homePageData.image, para2: homePageData.para2 });
    } else {
        res.status(401).render('401.ejs');
    }
}

exports.postHomePageData = async (req, res) => {
    const pageData = req.body;
    const isValid = validateHomePageData(pageData);
    const userUID = req.cookies.userUID;
    const authorized = await validateCookie(userUID);
        
    if (isValid && authorized) {
        // use pageData however you want
        const generalData = await firebaseModel.getUserDocument(userUID);
        const wikiData = await extractWikiContent(generalData.index.general.wikiURL);

        const homePageData = {
            title: wikiData.title,
            name: generalData.index.general.name,
            para1: wikiData.para1,
            image: wikiData.wikiImage,
            para2: wikiData.para2
        }

        const renderHomePageData = Object.assign({}, homePageData, pageData) // combining the page preferences and the user data 
        // console.log(renderHomePageData);

        res.render(path.join(__dirname,  '..', 'templates', 'home.ejs'), renderHomePageData, (err, html) => {
            if (err) {
                console.log('Error rendering EJS:', err);
                res.status(500).send('Error rendering EJS');
              } else {
                
                console.log('trying to download...');
                res.set({
                    'Content-Type': 'text/html',
                    'Content-Disposition': 'attachment; filename="home.html"'
                });
                // console.log(html);
                res.send(html)
              }
        });
    } else {
        res.status(400).send({message: 'Bad Request!'});
    }
}

exports.methodNotAllowed = (req, res) => {
    res.status(405).render('405.ejs');
}

exports.redirect = (req, res) => {
    res.redirect('/home');
}

// module.exports = {renderHomePage};