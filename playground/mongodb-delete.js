const {MongoClient, ObjectID} = require('mongodb')
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err){
        return console.log('Unable to connect to the database server')
    }
    console.log('Connection succesfull')
    const db = client.db('TodoApp')
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5c12b75fc806fe2c94e06bb3')
    }).then((result)=>{
        console.log(result)
    })
    // client.close()
})