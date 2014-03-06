var app= app || {};

app.Contact=Backbone.Model.extend({

	idAttribute: '_id',

	defaults: {
		_id: null,
		name: '',
		phone: '',
		email: '',
		address: ''
	}

});