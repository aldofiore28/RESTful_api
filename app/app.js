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
                    let dataResponse = {};
                    if (!err) {
                        if (result.length > 0) {
                            dataResponse = {
                                statusCode: 200,
                                message: 'data retrieved',
                                data: result
                            };
                            res.json(dataResponse);
                        } else {
                            dataResponse = {
                                statusCode: 204,
                                message: 'no data present in the db',
                                data: []
                            };
                            res.json(dataResponse);
                        }
                    } else {
                        dataResponse = {
                            error: {
                                statusCode: 500,
                                message: err
                            }
                        }
                        res.json(dataResponse);
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
                    let responseObject = {};
                    if (!err) {
                        if(result.result.ok) {
                            responseObject = {
                                statusCode: 201,
                                message: 'Task added to the database',
                                data: []
                            };
                            res.json(responseObject);
                        } else {
                            responseObject = {
                                statusCode: 400,
                                message: 'Database error, task not added to the database',
                                data: []
                            };
                            res.json(responseObject);
                        }
                    }
                })
            }
        })
    })

app.listen(port, () => {
    console.log('Connected to server');
})