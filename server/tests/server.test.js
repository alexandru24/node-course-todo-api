const request = require('supertest')
const expect = require('expect')
const {ObjectID} = require('mongodb')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todos = [{
    _id: new ObjectID(),
    text: 'Third todo'
}, {
    _id: new ObjectID(),
    text: 'Fourth todo'
}]

beforeEach((done)=>{
    Todo.deleteMany().then(()=>{
       return Todo.insertMany(todos)
    }).then(()=>done())
})

describe('POST /todos', ()=>{
    it('should create a new todo', (done)=>{
        const text = 'Get a better job'

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text)
        })
        .end((err, res)=>{
            if(err){
                return done(err)
            }

            Todo.find({text: 'Get a better job'}).then((todos)=>{
                expect(todos.length).toBe(1)
                expect(todos[0].text).toBe(text)
                done()
            }).catch((e)=>done(e))

        })
    })
    it('should not create a todo', (done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res)=>{
            if(err){
                return done(err)
            }

            Todo.find({}).then((todos)=>{
                expect(todos.length).toBe(2)
                done()
            }).catch((e)=>done(e))
        })
    })
})

describe('GET /todos', ()=>{
    it('should get todos', (done)=>{
        request(app)
         .get('/todos')
         .expect(200)
         .expect((res)=>{
             expect(res.body.todos.length).toBe(2)
         })
         .end(done)
    })
})

describe('GET todos/id', ()=>{
    it('should return todo doc', (done)=>{
        request(app)
         .get(`/todos/${todos[0]._id.toHexString()}`)
         .expect(200)
         .expect((res)=>{
             expect(res.body.todo.text).toBe(todos[0].text)
         })
         .end(done)
    })

    it('should return a 404 if todo not found', (done)=>{
        const id = new ObjectID().toHexString
        request(app)
         .get(`/todos/${id}`)
         .expect(404)
         .end(done)
    })
    it('should return 404 for non object id', (done)=>{
        request(app)
         .get('/todos/1234')
         .expect(404)
         .end(done)
    })
})

describe('DELETE /delete/:id', ()=>{
    it('should remove a todo', (done)=>{
        const hexID = todos[1]._id.toHexString()
        request(app)
         .delete(`/delete/${hexID}`)
         .expect(200)
         .expect((res)=>{
             expect(res.body.doc._id).toBe(hexID)
         })
         .end((err, res)=>{
             if(err){
                 return done(err)
             }

             Todo.findById(hexID).then((todo)=>{
                 expect(todo).toBeFalsy()
                 done()
             }).catch((e)=>done(e))
         })
    })
    it('should return 404 if todo not found', (done)=>{
        const hexID = new ObjectID().toHexString()
        request(app)
         .delete(`/todos/${hexID}`)
         .expect(404)
         .end(done)
    })
    it('should return 404 if object id is invalid', (done)=>{
        request(app)
         .delete('/delete/123')
         .expect(404)
         .end(done)
    })
})