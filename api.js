const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

// imagesAPI = https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=car&piprop=original

async function tryF() {
    try {
        const { data } = await axios.get('https://en.wikipedia.org/wiki/Sloth');
        const $ = cheerio.load(data);
        
        // Find elements with a specific class and log their data
        $('.mw-page-title-main').each((index, element) => {
            console.log($(element).text());
        });
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

// tryF();

async function getTitleandImg(url) {
    
}

