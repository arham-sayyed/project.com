const axios = require('axios');
const cheerio = require('cheerio');

async function getWikipediaData(url) {
    try {
        // Fetch HTML content of the Wikipedia page
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Extract title
        const title = $('h1#firstHeading').text().trim();

        // Extract paragraphs
        const paragraphs = [];
        $('div.mw-parser-output > p').each((index, element) => {
            const paragraphText = $(element).text().trim();
            // Exclude empty or short paragraphs
            if (paragraphText.length > 50) {
                paragraphs.push(paragraphText);
            }
            // Break loop when we have two paragraphs
            if (paragraphs.length >= 2) {
                return false;
            }
        });

        // Extract page title for image API
        const pageTitle = encodeURIComponent(title);

        // Fetch image using Wikipedia API
        const imageResponse = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${pageTitle}&piprop=original`);
        const imageData = imageResponse.data.query.pages;
        const pageId = Object.keys(imageData)[0];
        const imageInfo = imageData[pageId].original;
        const wikiImage = imageInfo ? imageInfo.source : null;

        // Create and return the object
        const dataObject = {
            title: title,
            para1: paragraphs[0] || '',
            para2: paragraphs[1] || '',
            wikiImage: wikiImage
        };
        return dataObject;
    } catch (error) {
        console.error("Error fetching Wikipedia data:", error);
        return null;
    }
}


module.exports = getWikipediaData;