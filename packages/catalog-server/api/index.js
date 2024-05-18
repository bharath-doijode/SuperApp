const express = require('express');
const ejs = require('ejs');

// if running on vercel, use generated .prod configs
const env = process.env.VERCEL ? '.prod' : '.dev';
const suffix = env + '.json';

const host = require('../data/host' + suffix);
const booking = require('../data/booking' + suffix);
const shopping = require('../data/shopping' + suffix);
const dashboard = require('../data/dashboard' + suffix);

const app = express();
const port = process.env.PORT ?? 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/host', (req, res) => {
  console.log("req >>>>>>>>> ", req);
  console.log("res >>>>>>>>> ", res);
  const platform = req.query.platform;
  const appVersion = req.query.appVersion;

  res.send(host[platform][appVersion]);
});

// Route for the root path ('/')
app.get('/', (req, res) => {
  console.log("req >>>>>>>>> ", req);
  console.log("res >>>>>>>>> ", res);
  console.log(`[CatalogServer] Server listening at port ${port} `);
  res.render('ackscreen'); // Render the index.ejs template
});

app.get('/farmerLead', (req, res) => {
  console.log("req >>>>>>>>> ", req);
  console.log("res >>>>>>>>> ", res);
  const platform = req.query.platform;
  const appVersion = req.query.appVersion;

  res.send(farmerLead[platform][appVersion]);
});

app.get('/farmer', (req, res) => {
  console.log("req >>>>>>>>> ", req);
  console.log("res >>>>>>>>> ", res);
  const platform = req.query.platform;
  const appVersion = req.query.appVersion;

  res.send(farmer[platform][appVersion]);
});

app.get('/dashboard', (req, res) => {
  console.log("req >>>>>>>>> ", req);
  console.log("res >>>>>>>>> ", res);
  const platform = req.query.platform;
  const appVersion = req.query.appVersion;

  res.send(dashboard[platform][appVersion]);
});

app.listen(port, () => {
  console.log(`[CatalogServer] Server listening at port ${port} `);
});

module.exports = app;
