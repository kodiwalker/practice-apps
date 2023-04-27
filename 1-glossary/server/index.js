require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require('morgan')
const app = express();
const GlossItem = require('./db.js');

//^ Middleware
app.use(morgan('dev'));
app.use(express.json());

//^ Serve client
app.use(express.static(path.join(__dirname, "../client/dist")));


//^                   --------------------------------
//^                                ROUTES
//^                   --------------------------------

//^   GET - Initial app render
app.get('/api', (req, res) => {
  console.log('Session ID!?', req.session_id)
  GlossItem.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error('Unable to GET from DB:', error);
    })
});

//^   POST - Add item form
app.post('/api', (req, res) => {
  GlossItem.create({ word: req.body.word, definition: req.body.definition })
    .then((response) => {
      res.json(response._id);
    })
    .catch((error) => {
      console.error('Unable to POST to DB:', error);
    })
});

//^   PATCH - Edit item button
app.patch('/api', (req, res) => {
  GlossItem.updateOne({ _id: req.body._id }, { word: req.body.word, definition: req.body.definition })
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Unable to Edit to DB:', error);
    })
});

//^   DELETE - Delete item button
app.delete('/api/:id', (req, res) => {
  GlossItem.deleteOne({ _id: req.params.id })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Unable to Delete item in DB:', error);
    })
});



app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT}`);