require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");
const db = require("./db");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);
// Parses incoming requests from JSON to JS.
app.use(express.json());
// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);
// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

//^                         --------------------------------
//^                                      ROUTES
//^                         --------------------------------

app.get('/checkout', (req, res) => {
  //^ See if req.session_id exists in DB, if not create row for it
  //^ .then send row obj back in 201 res
  const s_id = req.session_id;
  db.query('Insert Into orders (s_id) Values (?) On Duplicate Key Update s_id=s_id;', [s_id],
    (err, results) => {
      if (err) {
        console.error('Unable to get or create order:', err)
        res.status(500).send('Please contact system admin.')
        return;
      }
      db.query('Select * From orders Where s_id = (?);', [s_id], (err, results) => {
        if (err) {
          console.error('Unable to get or create order:', err)
          res.status(500).send('Please contact system admin.')
        } else {
          res.status(201).json(results[0]);
        }
      })
    })

});

app.patch('/checkout', (req, res) => {

});

app.patch('/checkout/complete', (req, res) => {

});



app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT}`);
