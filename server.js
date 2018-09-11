const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');
//const Item = require('./models/item');
const Build = require('./models/build');

const app = express();

const itemSchema = new mongoose.Schema({
    name: {type: String}
});

const Item = mongoose.model('Item', itemSchema);

app.use(morgan('common'));
app.use(express.json());

//Get requests
app.get('/', (req, res) => {
    res.status(200).sendFile('public/index.html', {
        root: __dirname
    });
});

/*
app.get('/items', (req, res, next) => {
    Item.find()
		.then(items => {
            res.json({
                items: items.map((item) => item.serialize())
            });
        })
        .catch(err => {
			next(err);
        });
});
*/

app.get('/items', (req, res, next) => {
	Item.find()
		.then(results => {
			res.status(200).json(results);
		})
		.catch(err => {
			next(err);
		})
})

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
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
//created schemas
//
//seed database with some data.
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
