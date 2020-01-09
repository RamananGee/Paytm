const functions = require('firebase-functions');
const express = require('express');

const app = express();

require('./routes')(app)



exports.app = functions.https.onRequest(app);
