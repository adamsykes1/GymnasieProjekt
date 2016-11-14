var express = require('express');
var ejs = require('ejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

//connect to db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://filmerian:cunt@ds055862.mlab.com:55862/filmerian');

//schema for db
var article = new mongoose.Schema({
  picture: String,
  content: {
    title: String,
    summary: String,
    text: String
  },
  author: String,
  date: {
    type: Date,
    default: Date.now
  }
});

var News = mongoose.model('News', article);

// //test
// var data = News({
//   picture: 'assets/images/strange.jpeg',
//   content:  {
//     title: "Snabba Cash",
//     summary: "bananbajs, kommande film om det hårda livet.",
//     text: "wdwdwdwdwdwdwdwdwdwwddwd",
//   }
// }).save(function(err) {
//   if (err) throw err;
//   console.log('item saved');
// });

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', function(req, res) {
  News.find({}, function(err, data) {
    if (err) throw err;
    res.render('index', {
      news: data
    });
  });
});

// app.get('/nyheter', function(req, res){
//   News.find({}, function(err, data) {
//     if (err) throw err;
//     res.render('news', {
//       news: data
//     });
//   });
// });

app.get('/nyheter/:id', function(req, res){
  var id = req.params.id;
  News.find({}, function(err, data) {
    if (err) throw err;
    res.render('news', {
      news: data
    });
  });
});

app.get('*', function(req, res) {
  res.render('404');
});

app.listen(1337);
console.log('listening to port 1337');
