var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');

var route = require('./routes/route');

// Connect to db
mongoose.connect('mongodb://localhost:27017/contactlist');


// Once connected
mongoose.connection.on('connected', ()=>{
    console.log('Connected to mongodb at 27017');
});

// For failed connection
mongoose.connection.on('error', (err)=>{
    if(err){
        console.log('Error connecting database: ' + err);
    }
});

var app = express();

// port
const port = 3000;

// adding middleware - cors
app.use(cors());

// Adding body parser
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Add routes
app.use('/api', route);

app.listen(port, ()=> {
    console.log('Server started at port: ' + port)
});
