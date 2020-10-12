// node-postgres package (npm i pg)
const {Client} = require('pg');
const client = new Client();

client.connect();

module.exports = {
    insertQuotes: function(author, quotesArr, callback) {
        client.query('SELECT id FROM author WHERE name = $1', [author])
        .then(res => {
            quotesArr.forEach((quote, index) => {
                client.query('INSERT INTO quote (author, quote) VALUES ($1, $2)', [res.rows[0].id, quote])
                .then(res => {
                    if (index === quotesArr.length-1) callback(null, res);
                })
                .catch(e => callback(e))
            })
        })
        .catch(e => console.error(e.stack))
    }
};