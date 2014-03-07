var app= app || {};

app.AppView=Backbone.View.extend({

	el: '.container',

	events: {
		'click #add': 'createContact',
		'keyup #cname': 'searchName'
	},

	initialize: function(){
		this.$list=this.$('.list-group');
		this.$detail=this.$('#detail');
		this.$sInput=this.$('#cname');

		this.listenTo(app.contacts, 'add', this.addOne);
		this.listenTo(app.contacts, 'reset', this.addAll);

		app.contacts.fetch();

	},

	addOne: function(contact){
		var view= new app.ItemView({model: contact});
		this.$list.append(view.render().el);
	},

	addAll: function(){
		this.$list.html('');
		app.contacts.each(this.addOne, this);
	},

	createContact: function(){
		this.$('.clicked').removeClass('clicked');
		var newContact=new app.Contact();
		var view=new app.DetailView({model: newContact});
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
			app.contacts.each(function(contact){
				if(contact.get('name').search(matchValue)!=-1){
					searchResult.push(contact);
				}
			});
			this.$list.html('');
			searchResult.forEach(this.addOne,this);
		}
	}

});