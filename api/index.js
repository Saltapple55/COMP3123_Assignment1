require('dotenv').config() //don;t need instance

const cors = require('cors');
const express = require('express');
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



const app = express();
//const SERVER_PORT = process.env.port || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: ['http://localhost:3001', 'https://comp-3123-assignment1-taupe.vercel.app/'], // Replace with your frontend URLs
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
        credentials: true, // Optional: Allow cookies if needed
      })

);

const userController = require('../routes/user');
const employeeController = require('../routes/employee');


app.use('/api/v1/user', userController)
app.use('/api/v1/emp', employeeController)

app.get("/", (req, res) =>{
    console.log('Handler executed');
//    console.log(res)
     res.status(200).send("Express on Vercel")
    });

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

module.exports = app;

// app.listen(SERVER_PORT, () => {
//     console.log(`Server is running on port http://localhost:${SERVER_PORT}`);
// })

