var contacts = require('../controllers/contacts');


module.exports=function(app){

	app.get('/contacts', contacts.findAll);
	app.post('/contacts', contacts.addCont);
	app.put('/contacts/:id', contacts.updateCont);
	app.del('/contacts/:id', contacts.removeCont);

	//未使用
	app.get('/contacts/:id', contacts.detailInfo);

};

