// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

var mongoose   = require('mongoose');
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
// mongoose.connect('mongodb://localhost/db_ads')
//   .then(() =>  console.log('connection succesful'))
//   .catch((err) => console.error(err));

 mongoose.connect('mongodb://localhost/db_ads');
//  mongoose.connect('mongodb://127.0.0.1/db_ads');
//mongoose.connect('mongodb://test_user:mongodbps@ds151702.mlab.com:51702/ad_db');

// var Schema = mongoose.Schema;

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   console.log("h");
// });

// exports.test = function(req,res) {
//   res.render('test');
// };


const app = express();

// Parsers for POST data
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000, uploadDir: '/dist' }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));