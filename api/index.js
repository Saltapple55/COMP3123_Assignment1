require('dotenv').config() //don;t need instance

const express = require('express');
const cors = require('cors');
const router = express.Router();

const mongoose = require('mongoose');
const mongoString=process.env.DATABASE_URL

var bodyParser = require('body-parser')

mongoose.connect(mongoString) 
const database = mongoose.connection

database.on('error', (error)=>{
    console.log(error)
})
database.once('connected', ()=>{
    console.log('Database Connected')
} )

const userController = require('./routes/user');
const employeeController = require('./routes/employee');


const app = express();
const SERVER_PORT = process.env.port || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
module.exports = router;

app.use('/api/v1/user', userController)
app.use('/api/v1/emp', employeeController)

app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

//router.post('')
app.get('/api', (req,res)=>{
    res.send('api')
    console.log("done")

})

app.post('/api/post', (req,res)=>{
    const rawBody=req.body
    res.send('Post API')
    console.log("done")

})


app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port http://localhost:${SERVER_PORT}`);
})