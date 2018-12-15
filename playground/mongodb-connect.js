const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err){
        return console.log('Unable to connect to database server')
    }
    console.log('Succesfully conected to database server')

    const db = client.db('TodoApp')
    // db.collection('TodoApp').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result)=>{
    //     if(err){
    //         return console.log('Unable to insert to do', err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    db.collection('Users').insertOne({
        name: 'Duduiala Alexandru',
        age: 32,
        location: 'Slatina'
    }, (err, result)=>{
        if(err){
            return console.log('Unable to connect to database', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    })
    client.close()
})