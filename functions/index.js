const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const serviceAccount = require('./project-rufus-firebase-adminsdk-bx2dx-28572f86b5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://project-rufus.firebaseio.com',
});

const app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
});

// test route to make sure everything is working (accessed at GET http://localhost:5000/api)
// router.get('/', function(req, res) {
//   res.json({ message: 'hooray! welcome to our api!' });
// });
// router.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });

// more routes for our API will happen here
const teamRoutes = require('./api/routes/teamRoutes');

// postRoutes(router);
// categoryRoutes(router);
teamRoutes(router);

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
