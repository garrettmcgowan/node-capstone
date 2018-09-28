const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Hirez = require('hirez.js');
let hirez = new Hirez({
    devId: '2670',
    authKey: '275CD287A1654C2D8CB0B0B6885158FF'
});

mongoose.Promise = global.Promise;
const app = express();

const {
    PORT,
    DATABASE_URL,
    TEST_DATABASE_URL,
    API_BASE_URL
} = require('./config');
const Build = require('./models/build');
const Item = require('./models/item');

app.use(express.static('public'));
app.use(morgan('common'));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).sendFile('public/index.html', {
        root: __dirname
    });
});

hirez.smite('PC').session.generate()
    .then((res) => {
        // The res variable with be your sessionId
        // It is also assigned to a process.env variable
    });

app.get('/items', (req, res, next) => {
    hirez.smite('PC').getItems().then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            next(err);
        })
});
app.post('/builds', (req, res, next) => {
    const requiredFields = ["item1"];
    res.json(req.body)
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    Build.create({
            item1: req.body.item1,
            item2: req.body.item2,
            item3: req.body.item3,
            item4: req.body.item4,
            item5: req.body.item5,
            item6: req.body.item6
        }).then(result => {
            res.status(200).json(results);
        })
        .catch(err => {
            next(err);
        });
});
app.get('/builds', (req, res, next) => {
    Build.find()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            next(err);
        })
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    if (err.status) {
        const errBody = Object.assign({}, err, {
            message: err.message
        });
        res.status(err.status).json(errBody);
    } else {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});
//run server function
// Listen for incoming connections
if (process.env.NODE_ENV !== 'test') {
    // Connect to DB and Listen for incoming connections
    mongoose.connect(DATABASE_URL)
        .then(instance => {
            const conn = instance.connections[0];
            console.info(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`);
        })
        .catch(err => {
            console.error(err);
        });
    app.listen(PORT, function () {
        console.info(`Server listening on ${this.address().port}`);
    }).on('error', err => {
        console.error(err);
    });
}

//const Hirez = require('hirez.js');
//let hirez = new Hirez({
//    devId: '2670'
//    authKey: '275CD287A1654C2D8CB0B0B6885158FF'
//});
//hirez.smite('pc').session.genterate().then((res) => {});
