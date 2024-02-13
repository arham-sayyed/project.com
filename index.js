const randomColor = require('randomcolor');
const fs = require('fs');

// Function to generate random index for array elements
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

// Sample data
let userName = "Arham";
userName = `${userName}'s`;
const title = "sloth";
const imageURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bicho-pregui%C3%A7a_3.jpg/400px-Bicho-pregui%C3%A7a_3.jpg"; // Replace with actual image URL
const firstParagraph = "First paragraph from Wikipedia";
let secondParagraph = "Second paragraph from Wikipedia";
secondParagraph = `${secondParagraph} <br>`
const links = [
    { href: 'about.html', text: 'about page' },
    { href: 'index.html', text: 'home page' },
    { href: 'input.html', text: 'input tags' },
    { href: 'headings.html', text: 'heading tags' },
    { href: 'lists.html', text: 'list tags' },
    { href: 'formatting.html', text: 'formatting tags' },
    { href: 'div.html', text: 'div tags' }
];

const bodyBgColor = randomColor();
const H1BgColor = randomColor();
const H1FontColor = randomColor();
const borderBgColor = randomColor();
const para1FontColor = randomColor();
// const para2FontColor = randomColor();
const aFontColor = randomColor();
const aBgColor = randomColor();



// Function to generate random placement of links
function generateRandomLinksHTML(links) {
    let html = '';
    const usedIndexes = new Set();
    while (usedIndexes.size < links.length) {
        const randomIndex = getRandomIndex(links);
        if (!usedIndexes.has(randomIndex)) {
            html += `<a href="${links[randomIndex].href}">${links[randomIndex].text}</a><br>`;
            usedIndexes.add(randomIndex);
        }
    }
    return html;
}

// Sample usage
const randomLinksHTML = generateRandomLinksHTML(links);

// Read the template file and replace placeholders with actual content
fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    // Replace placeholders with actual content
    const finalHTML = data
        .replace('%NAME%', userName)
        .replace('%MAIN_IMAGE_URL%', imageURL)
        .replace('%TITLE%', title) // Replace with actual topic name
        .replace('%TITLE%', title) // Replace with actual topic name
        .replace('%WIKI_PARA_1%', firstParagraph)
        .replace('%WIKI_PARA_2%', secondParagraph)
        .replace("%BODY_BG_COLOR%", bodyBgColor)
        .replace("%BORDER_BG_COLOR%" , borderBgColor)
        .replace("%H1_BG_COLOR%", H1BgColor)
        .replace("%H1_FONT_COLOR%", H1FontColor)
        .replace("%A_BG_COLOR%", aBgColor)
        .replace("%A_FONT_COLOR%", aFontColor)
        .replace("%PARA_1_BG_COLOR%", para1FontColor)
        .replace('%LINKS%', randomLinksHTML);

    // Write final HTML content to a new file
    fs.writeFile('index_3.html', finalHTML, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('HTML file generated successfully!');
    });
});