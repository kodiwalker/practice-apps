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

app.patch('/checkout/f1', (req, res) => {
  const s_id = req.session_id;
  const valsToUpdate = [req.body.name, req.body.email, req.body.password, req.body.f1complete, s_id];
  db.query('Update orders Set name= ?, email= ?, password= ?, f1complete= ? Where s_id = ?;', valsToUpdate, (err, results) => {
    if (err) {
      console.error('Unable to update order:', err)
      res.status(500).send('Unable to proceed. Refresh and try again.')
    } else {
      res.sendStatus(201);
    }
  })
});

app.patch('/checkout/f2', (req, res) => {
  const s_id = req.session_id;
  const valsToUpdate = [req.body.address, req.body.city, req.body.state, req.body.zip, req.body.phone, req.body.f2complete, s_id];
  db.query('Update orders Set address= ?, city= ?, state= ?, zip= ?, phone= ?, f2complete= ? Where s_id = ?;', valsToUpdate, (err, results) => {
    if (err) {
      console.error('Unable to update order:', err)
      res.status(500).send('Unable to proceed. Refresh and try again.')
    } else {
      res.sendStatus(201);
    }
  })
});

app.patch('/checkout/f3', (req, res) => {
  const s_id = req.session_id;
  const valsToUpdate = [req.body.cardnum, req.body.cardexp, req.body.cardcvv, req.body.cardzip, req.body.f3complete, s_id];
  db.query('Update orders Set cardnum= ?, cardexp= ?, cardcvv= ?, cardzip= ?, f3complete= ? Where s_id = ?;', valsToUpdate, (err, results) => {
    if (err) {
      console.error('Unable to update order:', err)
      res.status(500).send('Unable to proceed. Refresh and try again.')
    } else {
      res.sendStatus(201);
    }
  })
});

app.patch('/checkout/summary', (req, res) => {
  const s_id = req.session_id;
  const valsToUpdate = [req.body.purchased, s_id];
  db.query('Update orders Set purchased = ? Where s_id = ?;', valsToUpdate, (err, results) => {
    if (err) {
      console.error('Unable to complete order:', err)
      res.status(500).send('Unable to proceed. Refresh and try again.')
    } else {
      res.sendStatus(201);
    }
  })
});



app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT}`);
