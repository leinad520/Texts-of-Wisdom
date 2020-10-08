// dotenv module for Twilio environment variables
require('dotenv').config();

// Empty parentheses at end defaults to TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variable credentials in .env: https://www.npmjs.com/package/twilio
// Also can be written as: var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
var client = require('twilio')();

// for task scheduling
var cron = require('node-cron');

// fs
const fs = require('fs');
const { send } = require('process');
const Numbers = require('twilio/lib/rest/Numbers');


// create list of subscribers
var phoneNumbers = [
    '+16464013225', '+16466529920'
]

// Set counter for order of messages sent
let counter = 0;

// Get quotes from text file, turn into array, and pass as argument into sendMessages function
function getQuotes() {
    fs.readFile('./dalio.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        let quotesArr = data.split('\n');
        sendMessages(quotesArr);
    })
}

function sendMessages(quotes) {
    phoneNumbers.forEach(num => {
        client.messages.create({
            body: quotes[counter],
            from: '+12073053409',
            to: num
        })
        .then(msg => console.log(msg))
        .catch(err => console.error(err));
    });
    counter++;
}

cron.schedule('*/15 * * * * *', () => {
    getQuotes();
})


/*
Twilio Numbers
test 'from' number: +15005550006
real 'from' number: +12073053409
*/
