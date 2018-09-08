const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {
    PORT,
    DATABASE_URL
} = require('./config');
const {
    Item
} = require('./models/item');


const app = express();


app.use(morgan('common'));
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).sendFile('public/index.html', {
        root: __dirname
    });
});

app.get('/items', (req, res) => {
    Item
        .find()
        .then(items => {
            res.json({
                items: items.map((item) => item.serialize())
            });
        })
        .catch(
            err => {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            });
});

let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }

            server = app.listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

// `closeServer` function is here in original code

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
};

app.listen(process.env.PORT || 8080);
console.log('Running on port 8080...')
//created schemas
//
//seed database with some data
//
//create the endpoints one by one
//
//with above - focus on the full integration of an endpoint
//
//what I mean - create a specific endpoint - use the appropriate Mongoose operation to query your database as needed - perform the AJAX call on the client and render whatever you need


//const Hirez = require('hirez.js');
//let hirez = new Hirez({
//    devId: '2670'
//    authKey: '275CD287A1654C2D8CB0B0B6885158FF'
//});
//hirez.smite('pc').session.genterate().then((res) => {});
