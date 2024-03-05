const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
dotenv.config()
// const userRoute = require('./routes/userRoute');
//const UserModel = require('./models/user')

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

// app.use('/', userRoute);
connect = mongoose.connect('mongodb://127.0.0.1:27017/authentication');
console.log(connect||"not connected ")

app.use('/',require('./routes/userRoute'))

app.listen(3000,()=>{
    console.log('server is Running')
})