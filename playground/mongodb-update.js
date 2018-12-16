const {MongoClient, ObjectID} = require('mongodb')
MongoClient.connect('mongodb://localhost:27017/Todo', (err, client)=>{
    if(err){
        return console.log('Unable to connect to database server')
    }
    console.log('Connection succesful')
    const db = client.db('Todo')
    db.collection('users').findOneAndUpdate({
        _id: new ObjectID('5c16199249127c09d8227f3c')
    }, {
        $set: {
            name: 'Duduiala Victor'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }
    ).then((doc)=>{
        console.log(doc)
    })
})