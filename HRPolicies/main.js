var express = require("express");
var app = express();
var route = require('./source/serverJs/route');

var utils = require('../utils/util');
var util = new utils();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname + '/source'));

app.use('/:id',route);

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/source/html/index.html');
});

app.get('/:id/add-policy',function(req,res) {
    res.sendFile(__dirname + "/source/html/add_policy.html");
});

app.get('/:id/listElements',function(req,res) {
    res.sendFile(__dirname + "/source/html/list.html");
});

app.get('/:id/updateElements',function(req,res) {
    res.sendFile(__dirname + "/source/html/update.html");
});

app.get('/:id/deleteElements',function(req,res) {
    res.sendFile(__dirname + "/source/html/delete.html");
});

app.post('/hrpolicies/add', (req,res) => {
    let desc = req.body.polciyDesc;
    let text = [];
    let arrayVal = [];
    (Array.isArray(desc) ? arrayVal = desc : arrayVal.push(desc));
    let textLen = arrayVal.length;
    for(var i = 0; i < textLen; i++) {
        text[i] = {};
        text[i].id = i;
        text[i].text = arrayVal[i];
    }
    let data = {
        'name' : req.body.policyName,
        'desc' : text
    };
    util.addDataIntoCollection('hrpolicies',data)
    .then((data) => {
        console.log("Successfully inserted db");
        res.send(util.resMessage(data));
    })
    .catch((err) => {
        console.log("Failed inserted db");
        res.send(util.resMessage(err));
    });    
    
});

app.listen('8080');