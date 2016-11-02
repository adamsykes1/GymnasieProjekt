var express = require('express');
var ejs = require('ejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

//connect to db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://filmerian:cunt@ds055862.mlab.com:55862/filmerian');

//schema for db
var newsCards = new mongoose.Schema({
  picture: String,
  title: String,
  summary: String,
  date: {
    type: Date,
    default: Date.now
  }
});

var News = mongoose.model('News', newsCards);

// //test
// var data = News({picture: 'assets/images/strange.jpeg', title: 'bananbajs',
// summary: 'bananbajs, kommande film om det hårda livet.'}).save(function(err){
//   if (err) throw err;
//   console.log('item saved');
// });

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', function(req, res) {
  News.find({}, function(err, data) {
    if (err) throw err;
    res.render('index', {
      content: data
    });
  });
});

app.get('*', function(req, res) {
  res.render('404');
});

app.listen(1337);
console.log('listening to port 1337');
