define(function(require, exports, module){
	var Backbone=require('backbone');
	var Contact=require('../models/contact');

	var Contacts=Backbone.Collection.extend({

		model: Contact,

		url: '/contacts'

	});

	module.exports=new Contacts();



});
