const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'shopalbion';
const client = new MongoClient(url,{useNewUrlParser: true });

// api
app.use(express.static('Public'))

app.get('/', function(req, res) {
 
  res.sendFile(__dirname + '/Public/View/index.html');
  
});

app.get('/items', function(req, res) {
 
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    var query = 
    
    db.collection("items").find(
          {LocalizedNames : { $elemMatch: { Key: "PL-PL" } }}
         //{ UniqueName: /^T1/ }         
      ).project(
        { LocalizedNames : { $elemMatch: { Key: "PL-PL" } } }        
      ).toArray(function(err, data) 
      {
         let resultArray =[]
         let mapObject = {};
         for(let i =0;i<data.length;i++){
            mapObject = Object.assign({},{ _id : data[i]._id, value : data[i].LocalizedNames[0].Value});
            resultArray.push(mapObject);
         }
         res.json(resultArray);
    }); 
  });
  
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})



