//Type node index.js to run
//Use nodemon index.js to auto-reload when changes are made
// if nodemon isnt installed: npm install -g nodemon
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//use bodyParser() to let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/', function (req, res) {
  res.send("localhost:3000\ntest : " + req.body.test + "\nanotha_test : " + req.body.anotha_test);
});

app.post('/test', function (req, res) {
  res.send("localhost:3000/test\nJSON test : " + req.body.test);
});

app.listen(3000, function () {
  console.log("Listening to port 3000!");
});
