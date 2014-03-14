define(function(require, exports, module){
	var AppView=require('./views/app');
	var contacts=require('./collections/contacts');

	var socket = io.connect('http://localhost');

  socket.on('new', function(){
    console.log('client get the msg');
    contacts.fetch();
  });


	new AppView();

});