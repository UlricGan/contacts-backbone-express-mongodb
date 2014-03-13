var contacts = require('../controllers/contacts');


module.exports=function(app, emitter){

	var addEvent=function(req, res, next){
		if(!req.emitter){
			req.emitter=emitter;
		}
		next();
	};
	
	app.get('/contacts', addEvent, contacts.findAll);
	app.post('/contacts', addEvent, contacts.addCont);
	app.put('/contacts/:id', addEvent, contacts.updateCont);
	app.del('/contacts/:id', addEvent, contacts.removeCont);

	//未使用
	app.get('/contacts/:id', addEvent, contacts.detailInfo);

};

