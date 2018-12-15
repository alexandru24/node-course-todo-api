const {MongoClient, ObjectID} = require('mongodb')
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err){
        return console.log('Unable to connect to database server')
    }
    console.log('Connection succesful')
    const db = client.db('TodoApp')
    db.collection('Users').find({name: 'Duduiala Alexandru'}).toArray().then((docs)=>{
        console.log(`Number of users with the age of 35`)
        let number = 0
        docs.forEach(()=>{
            number++
        })
        console.log(number)
    }, (err)=>{
        console.log('There was an error', err)
    })
})