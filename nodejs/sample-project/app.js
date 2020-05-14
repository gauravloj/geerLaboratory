var express = require('express');
var routes = require('./routes');
var http = require('http');
var url = require('url');
var path = require('path');
var bodyParser = require('body-parser');
var json = require('json');
var logger = require('logger');
var methodOverride = require('method-override');
var nano = require('nano')('http://localhost:5984');

var db = nano.use('address');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade' );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

app.post('/createdb',function(req, res){
    nano.db.create(req.body.dbname, function(err){
        if(err){
            res.send('Error creating database ' + req.body.dbname);
            return;
        }

        res.send('Successfully created database ' + req.body.dbname);
    });
});

app.post('/new_contact', function(req, res){
    var name = req.body.name;
    var phone = req.body.phone;

    db.insert({name: name, phone: phone, crazy:true}, phone, function(err, body, header){
        if (err) {
            res.send('Error creating contact');
            return;
        }

        res.send('Successfully created contact');
    });
});


app.post('/view_contact', function(req, res){
    var allDoc = "All contacts are: ";

    db.get(req.body.phone, {revs_info: true}, function(err, body){
        if (!err) {
            console.log(body);
        }

        if (body){
            allDoc += 'Name: ' + body.name + '</br>Phone number: ' + body.phone;
        } else {
            allDoc = 'No contacts found';
        }
        res.send(allDoc);
    });
});


app.post('/delete_contact', function(req, res){

    db.get(req.body.phone, {revs_info:true}, function(err, body){
        if (!err) {
            db.destroy(req.body.phone, body._rev, function(err, body){
                if (err) {
                    res.send('Unable to delete contact');
                }
            });
            res.send('Successfully deleted contact');
        }
    });
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});