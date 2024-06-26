var express=require("express");
var bodyParser=require("body-parser");
 
const mongoose = require('mongoose');
/*
mongoose.connect('mongodb://localhost:27017/UserForm');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
 */
function connectDB() {
    const url = "mongodb://127.0.0.1/UserForm";
  
    try {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
    
    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
      console.log(`Database connected: ${url}`);
    });
  
    dbConnection.on("error", (err) => {
      console.error(`connection error: ${err}`);
    });
    return;
  }
  
connectDB()
const db=mongoose.connection
var app=express()
 
 
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.post('/sign_up', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.password;
    var phone =req.body.phone;
 
    var data = {
        "name": name,
        "email":email,
        "password":pass,
        "phone":phone
    }
    
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
             
    });
         
    return res.redirect('signup.html');
})
 
 
app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('index.html');
}).listen(3000)
 
 
console.log("server listening at port 3000");
