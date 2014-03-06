var app = app || {};

var Contacts=Backbone.Collection.extend({

	model: app.Contact,

	url: '/contacts'

});

app.contacts=new Contacts();