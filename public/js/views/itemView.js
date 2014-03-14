define(function(require, exports, module){

	var Backbone=require('backbone');
	var $ =require('jquery');
	var _ =require('underscore');
	var DetailView=require('../views/detailView');

	var ItemView=Backbone.View.extend({

		tagName: 'li',

		itemTamplate: _.template($('#contact-item').html()),

		events: {
			'click': 'showDetail'
		},

		initialize: function(){
			this.listenTo(this.model, 'change:name', this.render);
			this.listenTo(this.model, 'remove', this.clear);
		},

		render: function(){
			if(this.$('a').hasClass('clicked') || this.model.isNew()){
				this.$el.html(this.itemTamplate(this.model.toJSON()));
				this.$('a').addClass('clicked');
			}else{
				this.$el.html(this.itemTamplate(this.model.toJSON()));
			}
			return this;
		},

		showDetail: function(){
			$('.clicked').removeClass('clicked');
			this.$('a').addClass('clicked');
			var view =new DetailView({model: this.model});
			$('#detail').html(view.render().el);
		},

		clear: function(){
			this.remove();
		}

	});

	module.exports=ItemView;


});