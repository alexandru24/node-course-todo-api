const {MongoClient, ObjectID} = require('mongodb')
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err){
        return console.log('Unable to connect to the database server')
    }
    console.log('Connection succesfull')
    const db = client.db('TodoApp')
    db.collection('Todos').insertOne({
        text: 'Go to Austria',
        completed: false
    }, (err, result)=>{
        if(err){
            console.log('Unable to insert document')
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    })
    client.close()
})