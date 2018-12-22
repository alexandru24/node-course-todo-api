const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {UserEmail} = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.post('/todos', (req, res)=>{
    const newTodo = new Todo({
        text: req.body.text
    })
    newTodo.save().then((doc)=>{
        res.send(doc)
    }, (e)=>{
        res.status(400).send(e)
    })
})

app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    })
}, (e)=>{
    res.status(400).send(e)
})

app.get('/todos/:id', (req, res)=>{
    const id = req.params.id
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
           return res.status(404).send({})
        }
        res.status(200).send({todo})
    }).catch((e)=>{
        res.status(400).send()
    })
})

app.delete('/delete/:id', (req, res)=>{
    const id = req.params.id
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Todo.findOneAndDelete({_id: id}).then((doc)=>{
        if(!doc){
            return res.status(404).send({})
        }
        res.status(200).send({doc})
    }).catch((e)=>{
        res.status(400).send()
    })
})

app.listen(port, ()=>{
    console.log(`App started on port ${port}`)
})

module.exports = {app}