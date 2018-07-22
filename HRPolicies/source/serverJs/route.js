var express = require('express');
var app = express.Router({mergeParams: true});

var utils = require('../../../utils/util');
var util = new utils();

/*app.get('/',function(req,res) {
    mongoClient.connect(dbURL)
    .then((db) => {
        let collectionName = req.params.id;
        db.db('API').collection(collectionName).find({}).toArray()
        .then((dataArray) => {
            res.send(dataArray);
        })
        .catch((err) => {
            res.send(err);
        });
    })
    .catch((err) => {
        res.send(err);
    });
});
*/

app.get("/listall",function(req,res) {
    let collectionName = req.params.id;
    console.log(collectionName);
    util.getDataFromCollection(collectionName)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send(err);
    });
});

app.delete("/delete",function(req,res) {
    util.deleteDataFromCollection(req.params.id,req.body.id)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send(err);
    });
});

app.put("/update",function(req,res) {
    let query = {
        name : req.body.name,
        id : req.body.id,
        desc : req.body.desc
    };
    //let updatedDesc = {$set : {'desc.$.text' : req.body.desc}};
    util.updateSingleData(req.params.id,query)
    .then((resp) => {
        res.send(resp);
    })
    .catch((err) => {
        res.send(err);
    });    
});

module.exports = app;