const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;

const objectId = mongo.ObjectId;

const url = 'mongodb://localhost:27017';
const dbname = 'tasks';
const client = new mongoClient(url);

const jsonParser = bodyParser.json();

const app = express();
const port = 3000;

app.route('/tasks')
    .get((req, res) => {
        client.connect((err) => {
            if (!err) {
                const db = client.db(dbname);
                db.collection('tasks').find({}).toArray((err, result) => {
                    if (!err) {
                        res.json(result);
                    }
                })
            }
        })
    })
    .post(jsonParser, (req, res) => {
        let data = req.body;
        client.connect((err) => {
            if (!err) {
                const db = client.db(dbname);
                db.collection('tasks').insertOne(data, (err, result) => {
                    if (!err) {
                        // change this to return a certain data in a certain way
                        res.json(result);
                    }
                })
            }
        })
    })

app.listen(port, () => {
    console.log('Connected to server');
})