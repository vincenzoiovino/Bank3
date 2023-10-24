console.log('Bank3 server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const nocache = require('nocache');
const cors = require('cors');
app.use(nocache());
app.use(cors());

// connect to the db and start the express server
let db;

// ***Replace the URL below with the URL for your database***
const url =  'mongodb://localhost:27017/bank3';

MongoClient.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  db = database;
  // start the express web server listening on 8080
  app.listen(8080, () => {
    console.log('listening on 8080');
  });
});





// add a document to the DB collection recording the uncofirmed A
app.get('/unconfirmed/:A', (req, res) => {
  const deposit= {_id: req.params.A,isConfirmed:false,nCoins:-1,date:Date.now(),txn:""};
  console.log(req.params.A);
  console.log("unonfirmed");

  db.collection('bank3').insertOne(deposit, (err, result) => {
    if (err) {
     console.log(err);
 res.status(400).json({
            success: false,
            error: err.message
        });
    return;
    }
    console.log('deposit added to db:'+result);
    res.send("ok");
  });
});
// add a document to the DB collection recording the cofirmed A
app.get('/confirmed/:A/:txn', (req, res) => {
// check if req.params.A is confirmed and gets corresponding nCoins and possibly sender of the transaction txn
  console.log(req.params.A);
  console.log(req.params.txn);
  console.log("confirmed");
const myquery = { _id: req.params.A };
const newvalues = { $set: {isConfirmed: true,sender:"",nCoins:-1,date:Date.now(),txn:req.params.txn } };
  db.collection('bank3').update(myquery, newvalues, (err, result) => {
    if (err) {
     console.log(err);
 res.status(400).json({
            success: false,
            error: err.message
        });
    return;
    }
    console.log('deposit confirmed into db:'+result);
    res.send("ok");
  });
});


app.get('/deposits', (req, res) => {

  db.collection('bank3').find({isConfirmed: true}).toArray((err, result) => {
    if (err) return console.log(err);
    console.log(result);
    res.send(result);
  });
});
