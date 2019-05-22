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

app.get('/tasks', (request, response) => {
    client.connect((err) => {
        if(!err) {
            const db = client.db(dbname);
            getTasks(db, {}, (result) => {
                if(result.length > 0) {
                    response.json({ success: true, message: 'All the tasks retrieved', data: result });
                } else {
                    response.json({ success: false, message: 'No data found', data: [] });
                }
            })
        }
    })
});

app.post('/tasks', jsonParser, (request, response) => {
    const newTask = request.body;
    client.connect((err) => {
        if(!err) {
            const db = client.db(dbname);
            if (typeof newTask === 'object' && newTask.task !== '') {
                addNewTask(db, newTask, (result) => {
                    if(result.insertedCount) {
                        response.json({ success: true, message: 'Task added to the database', data: [] });
                    } else {
                        response.json({ success: false, message: 'Sorry, something went wrong', data: [] });
                    }
                })
            } else {
                response.json({ success: false, message: 'The new task was invalid!', data: []});
            }
        }
    })
});

app.put('/tasks/:id', (request, response) => {
    const id = request.params.id;
    client.connect((err) => {
        if(!err) {
            const db = client.db(dbname);
            if (id.length === 24) {
                completeTask(db, objectId(id), (result) => {
                    if(result.modifiedCount) {
                        response.json({ success: true, message: 'Task completed!', data: [] });
                    } else {
                        response.json({ success: false, message: 'Sorry, something went wrong', data: [] });
                    }
                })
            } else {
                response.json({ success: false, message: 'The id is not valid', data: [] });
            }
        }
    })
});


function getTasks(db, condition, callback) {
    const collection = db.collection('tasks');
    collection.find(condition).toArray((err, result) => {
        callback(result);
    })
}

function  addNewTask(db, input, callback) {
    const collection = db.collection('tasks');
    collection.insertOne(input, (err, result) => {
        callback(result);
    })
}

function completeTask(db, id, callback) {
    const collection = db.collection('tasks');
    collection.updateOne({"_id": id}, {$set: {completed: 1}}, (err, result) => {
        callback(result);
    })
}

app.listen(port, () => {
    console.log('Connected to server');
})