define(function(require, exports, module){
	var Backbone=require('backbone');
	
	var Contact=Backbone.Model.extend({

		idAttribute: '_id',

		defaults: {
			_id: null,
			name: '',
			phone: '',
			email: '',
			address: ''
		}

	});

	module.exports=Contact;

});