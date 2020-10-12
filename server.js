// dotenv module for Twilio environment variables
require('dotenv').config();

// Empty parentheses at end defaults to TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variable credentials in .env: https://www.npmjs.com/package/twilio
// Also can be written as: var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
var client = require('twilio')();

// for task scheduling
var cron = require('node-cron');

// fs
const fs = require('fs');
// Twilio added
const { send } = require('process');
const Numbers = require('twilio/lib/rest/Numbers');

// import db
const db = require('./db.js');

// Express server
const express = require('express');
const server = express();
// Body parser to get body from post request
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

server.post('/quotes', jsonParser, (req, res) => {
    let author = req.body.author;
    let quotesArr = req.body.quotes;
    db.insertQuotes(author, quotesArr, (err, dbRes) => {
        if (err) res.status(500).json({err});
        if (!err) res.status(200).json({message: `success inserting ${quotesArr.length} quotes`});
    })
})

server.listen(process.env.SERVERPORT, () => {
    console.log(`Server listening on port ${process.env.SERVERPORT}`);
})

// fs.readFile('./edited-dalio-text.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     let quotesArr = data.split('\n');
//     db.insertQuotes('Dalio', quotesArr);
// });

// fs.readFile('./draper.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     let quotesArrTwo = data.split('\n');
//     for (let i = 1; i < quotesArrTwo.length; i ++) {
//         quotesArrTwo.splice(i, 1)
//     }
//     db.insertQuotes('Draper', quotesArrTwo);
// })

// create list of subscribers
var phoneNumbers = [
    '+16464013225'
]
// Sam Hodak: '+16466529920'

// Set counter for order of messages sent
let counter = {
    dalio: 0,
    draper: 0
}

// Get quotes from text file, turn into array, and pass as argument into sendMessages function

function getQuotes() {
    // Dalio
    fs.readFile('./edited-dalio-text.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        let quotesArr = data.split('\n');
        sendMessages(quotesArr, 'Dalio')
    })
    
    // Draper
    fs.readFile('./draper.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        let quotesArrTwo = data.split('\n');
        for (let i = 1; i < quotesArrTwo.length; i ++) {
            quotesArrTwo.splice(i, 1)
        }
        sendMessages(quotesArrTwo, 'Draper');
    })
}

function sendMessages(quotes, author) {
    phoneNumbers.forEach(num => {
        client.messages.create({
            body: `${author === 'Dalio' ? `Principle of the day: ${quotes[counter[author]]}` : quotes[counter[author]]} - ${author}`,
            from: '+12073053409',
            to: num
        })
        // .then(msg => console.log(msg))
        .catch(err => console.error(err));
    });
    counter[author]++;
}

// cron.schedule('*/10 * * * * *', () => {
//     getQuotes();
// })


/*
Twilio Numbers
test 'from' number: +15005550006
real 'from' number: +12073053409
*/
