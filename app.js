var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*io.set('log level', 1);
io.sockets.on('connection', function (socket) {
   var ID = (socket.id).toString().substr(0, 5);
   var time = (new Date).toLocaleTimeString();
   socket.json.send({'event':'connected', 'name':ID, 'time':time});
   socket.broadcast.json.send({'event':'connected', 'name':ID, 'time':time});
   socket.on('message', function (msg) {
       var time = (new Date).toLocaleTimeString();
       socket.json.send({'event':'messageSent', 'name':ID, 'text':msg, 'time':time});
       socket.broadcast.json.send({'event':'messageSent', 'name':ID, 'text':msg, 'time':time});
   });
   socket.on('disconnect', function () {
       var time = (new Date).toLocaleTimeString();
       io.json.send({'event':'userSplit', 'name':ID, 'time':time});
   });
});*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*app.use(function (req, res, next) {
    res.io = io;
    next();
});*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
