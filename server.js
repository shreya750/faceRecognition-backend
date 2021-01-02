const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

// const register =require('./controllers/register');
// const signin = require('./controllers/signin');
// const profile = require('./controllers/profile');
// const image = require('./controllers/image');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'pwd123',
    database : 'smartbrain'
  }
});


// db.select('*').from('smart_brain_users').then(data=>{
   
//     console.log(data);
// });


//https://medium.com/@selvaganesh93/how-node-js-middleware-works-d8e02a936113
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {res.send(db.users) })

app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)})


app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id' ,(req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)})


//comments


// bcrypt.compare("B4c0/\/", hash, function(err, res) {
//     // res === true
// });
app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

