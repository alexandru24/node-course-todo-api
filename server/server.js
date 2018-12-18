const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {UserEmail} = require('./models/user')

const app = express()

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

app.post('/users', (req, res)=>{
    const addUser = new UserEmail({
        email: req.body.email
    })
    addUser.save().then((doc)=>{
        res.send(doc)
    }, (e)=>{
        res.status(400).send(e)
    })
})

app.listen(3000, ()=>{
    console.log('App started on port 3000')
})

module.exports = {app}