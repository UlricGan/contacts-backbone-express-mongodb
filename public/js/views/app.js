define(function(require, exports, module){

	var Backbone=require('backbone');
	var $=require('jquery');
	var _=require('underscore');
	var DetailView=require('./detailView');
	var ItemView=require('./itemView');
	var contacts=require('../collections/contacts');
	var Contact=require('../models/contact');

	var AppView=Backbone.View.extend({

		el: '.container',

		events: {
			'click #add': 'createContact',
			'keyup #cname': 'searchName'
		},

		initialize: function(){
			this.$list=this.$('.list-group');
			this.$detail=this.$('#detail');
			this.$sInput=this.$('#cname');

			this.listenTo(contacts, 'add', this.addOne);
			this.listenTo(contacts, 'reset', this.addAll);

			contacts.fetch();

		},

		addOne: function(contact){
			var view= new ItemView({model: contact});
			this.$list.append(view.render().el);
		},

		addAll: function(){
			this.$list.html('');
			contacts.each(this.addOne, this);
		},

		createContact: function(){
			this.$('.clicked').removeClass('clicked');
			var newContact=new Contact();
			var view=new DetailView({model: newContact});
			this.$detail.html(view.transform().render().el);
		},

		searchName: function(){
			var searchValue=this.$sInput.val(),
					searchResult=[],
					regValue='',
					matchValue;
			if(!searchValue){
				this.addAll();
			}else{

				console.log(searchValue);
				for(var i=0; i<searchValue.length; i++){
					regValue+='['+searchValue[i]+']+\\w*';
				}
				matchValue=new RegExp(regValue);
				contacts.each(function(contact){
					if(contact.get('name').search(matchValue)!=-1){
						searchResult.push(contact);
					}
				});
				this.$list.html('');
				searchResult.forEach(this.addOne,this);
			}
		}

	});

	module.exports=AppView;

});