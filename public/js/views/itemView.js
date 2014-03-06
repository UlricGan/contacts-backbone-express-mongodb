var app= app || {};

app.ItemView=Backbone.View.extend({

	tagName: 'li',

	itemTamplate: _.template($('#contact-item').html()),

	events: {
		'click': 'showDetail'
	},

	initialize: function(){
		this.listenTo(this.model, 'change:name', this.render);
	},

	render: function(){
		this.$el.html(this.itemTamplate(this.model.toJSON()));

		return this;
	},

	showDetail: function(){

		var view =new app.DetailView({model: this.model});
		$('#detail').html(view.render().el);
	}


});