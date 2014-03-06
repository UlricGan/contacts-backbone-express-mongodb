var app= app || {};

app.AppView=Backbone.View.extend({

	el: '.container',

	events: {
		'click #add': 'createContact'
	},

	initialize: function(){
		this.$list=this.$('.list-group');
		this.$detail=this.$('#detail');

		this.listenTo(app.contacts, 'add', this.addOne);
		this.listenTo(app.contacts, 'reset', this.addAll);
		this.listenTo(app.contacts, 'remove', this.addAll);

		app.contacts.fetch();

	},

	addOne: function(contact){
		var view= new app.ItemView({model: contact});
		this.$list.append(view.render().el);
	},

	addAll: function(){
		this.$list.html();
		app.contacts.each(this.addOne, this);
	},

	createContact: function(){
		var newContact=new app.Contact();
		var view=new app.DetailView({model: newContact});
		this.$detail.html(view.transform().render().el);
	}

});