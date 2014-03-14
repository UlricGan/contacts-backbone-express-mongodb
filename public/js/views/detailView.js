define(function(require, exports, module){
	var Backbone=require('backbone');
	var $=require('jquery');
	var _=require('underscore');
	var contacts=require('../collections/contacts');

	var DetailView=Backbone.View.extend({

		showType: 'info',

		tagName: 'div',

		detailTemplate: _.template($('#contact-detail').html()),

		events: {
			'click .js-edit': 'edit',
			'click .js-edit-save': 'saveEdit',
			'click .js-add-save': 'saveAdd',
			'click .js-remove': 'clear'
		},

		render: function(){

			this.$el.html(this.detailTemplate(this.model.toJSON()));

			if(this.showType==='info'){
				this.$('form').addClass('is-hidden');
				this.$('.js-operate').addClass('js-edit');
			}else{
				this.$('dl').addClass('is-hidden');
				this.$('.js-operate').addClass('js-add-save').text('保存');
			}

			return this;

		},

		edit: function(){

			this.$('dl').addClass('is-hidden');
			this.$('form').removeClass('is-hidden');
			this.$('.js-edit').removeClass('js-edit').addClass('js-edit-save').text('保存');

		},

		newAtr: function(){
			return {
				name: this.$('#editName').val().trim(),
				phone: this.$('#editPhone').val().trim(),
				email: this.$('#editEmail').val().trim(),
				address: this.$('#editAddress').val().trim()
			};
		},

		saveEdit: function(){

			var sendAtr={};

			if(this.newAtr().name!=this.model.name){
				sendAtr.name=this.newAtr().name;
			}
			if(this.newAtr().phone!=this.model.phone){
				sendAtr.phone=this.newAtr().phone;
			}
			if(this.newAtr().email!=this.model.email){
				sendAtr.email=this.newAtr().email;
			}
			if(this.newAtr().address!=this.model.address){
				sendAtr.address=this.newAtr().address;
			}


			this.model.save(sendAtr);
			this.render();

		},

		saveAdd: function(){
			this.model.set(this.newAtr());
			contacts.create(this.model);

			this.showType='info';
			this.render();

		},

		clear: function(){


			this.model.destroy();
			this.remove();
		},

		transform: function(){
			this.showType='create';
			return this;
		}

	});

	module.exports=DetailView;



});