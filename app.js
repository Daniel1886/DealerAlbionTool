const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const port = 3000


// api
app.use(express.static('Public'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/Public/View/index.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})



//connect to database 

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'shopalbion';

// Create a new MongoClient
const client = new MongoClient(url,{useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});