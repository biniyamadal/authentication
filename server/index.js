const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/users')

const app = express()
app.use(cors())
app.use(express.json())

var connect = mongoose.connect('mongodb://127.0.0.1:27017/crud')
console.log(connect||"not connected ")

app.use('/', require('./routes/userRoute'));





// app.get('/',routes)
app.get('/getUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

// app.put('/Update/:id',(req,res)=>{
//     const id = req.params.id;
//    const updateu= UserModel.findByIdAndUpdate({_id:id},{
//         name:req.body.uname, 
//         email:req.body.uemail
//     })
//     .then(users=>res.json(users))
//     .catch(err=>res.json(err))
// // console.log("daa ",updateu)
// })

// app.delete('/deleteUser/:id',(req,res)=>{
//     console.log("the id is ")

//     const id = req.params.id;
//    const deleteduser=  UserModel.findByIdAndDelete({_id:id}) 
//     .then(users=>res.json(users))
//     .catch(err=>res.json(err))
//     console.log("the id in backend  ",id,deleteduser)
// })

app.post('/createUser',(req,res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.listen(5000, ()=>{
    console.log('server is running')
});