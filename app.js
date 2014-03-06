
/**
 * Module dependencies.
 */

var express = require('express');
var contacts = require('./routes/contacts');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/contacts', contacts.findAll);
app.get('/contacts/:id', contacts.detailInfo);
app.post('/contacts', contacts.addCont);
app.put('/contacts/:id', contacts.updateCont);
app.del('/contacts/:id', contacts.removeCont);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
