const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const config = {
  apiKey: 'AIzaSyA0_eG1U3QHIKbr4UpmW8GLrH5YbF_La_E',
  authDomain: 'project-rufus.firebaseapp.com',
  databaseURL: 'https://project-rufus.firebaseio.com',
  projectId: 'project-rufus',
  storageBucket: 'project-rufus.appspot.com',
  messagingSenderId: '83992737225',
};

admin.initializeApp(config);

const app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:5000/api)
// router.get('/', function(req, res) {
//   res.json({ message: 'hooray! welcome to our api!' });
// });
// router.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });

// more routes for our API will happen here
const postRoutes = require('./api/routes/postRoutes');
const categoryRoutes = require('./api/routes/categoryRoutes');

postRoutes(router);
categoryRoutes(router);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// serve React app
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(5000);
console.log('Magic happens on port ' + '5000');

// app.get('/api', (request, response) => {
//   response.send(`${Date.now()}`);
// });

exports.app = functions.https.onRequest(app);
