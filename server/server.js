const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const _ = require('lodash')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {UserEmail} = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

// use midleware bodyparser to parse objects to json
app.use(bodyParser.json())

// route to create and save a todo to the database
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

// route to get all todos from database
app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    })
}, (e)=>{
    res.status(400).send(e)
})


// route to get todo by id from database
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

// route to find todo by id and delete it and returning the deleted todo
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

// route to find a todo by id and update it
app.patch('/todos/:id', (req, res)=>{
    const id = req.params.id
    const body = _.pick(req.body, ['text', 'completed'])

    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }

    Todo.findOneAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send()
        }
        res.status(200).send({todo})
    }).catch((e)=>{
        res.status(400).send()
    })

})

app.listen(port, ()=>{
    console.log(`App started on port ${port}`)
})

module.exports = {app}