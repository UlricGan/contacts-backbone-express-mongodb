var mongodb=require('../models/db');
var BSON=require('mongodb').BSONPure;


exports.findAll=function(req, res){
	mongodb.open(function(err, db){
		if(err){
			res.send(err);
		}
		db.collection('contacts', function(err, collection){
			if(err){
				res.send(err);
			}
			collection.find().toArray(function(err, items){
				mongodb.close();
				if(err){
					res.send(err);
				}
				res.send(items);
			});
		});
	});
};

//未使用
exports.detailInfo=function(req, res){
	var id=req.params.id;
	mongodb.open(function(err, db){
		if(err){
			res.send(err);
		}
		db.collection('contacts', function(err, collection){
			if(err){
				res.send(err);
			}
			collection.findOne({ '_id': new BSON.ObjectID(id)},function(err, item){
				mongodb.close();
				if(err){
					res.send(err);
				}
				res.send(item);
			});
		});
	});
};

exports.addCont=function(req, res){
	var contact=req.body;
	mongodb.open(function(err, db){
		if(err){
			res.send(err);
		}
		db.collection('contacts', function(err, collection){
			if(err){
				res.send(err);
			}
			collection.insert({name: contact.name, phone: contact.phone, email: contact.email, address: contact.address}, {safe: true}, function(err, result){
				mongodb.close();
				if(err){
					res.send(err);
				}
				console.log('adding is successful');
				res.send(result[0]);
			});
		});
	});

};

exports.updateCont=function(req, res){
	var contact=req.body,
		id=req.params.id;
	contact._id=new BSON.ObjectID(contact._id);
	mongodb.open(function(err, db){
		if(err){
			res.send(err);
		}
		db.collection('contacts', function(err, collection){
			if(err){
				res.send(err);
			}
			collection.update({'_id': new BSON.ObjectID(id)}, contact, {safe: true}, function(err, result){
				mongodb.close();
				if(err){
					res.send(err);
				}
				res.send(contact);
				console.log('updating is successful');
			});
		});
	});
};

exports.removeCont=function(req, res){
	var id=req.params.id;
	mongodb.open(function(err, db){
		if(err){
			res.send(err);
		}
		db.collection('contacts', function(err, collection){
			if(err){
				res.send(err);
			}
			collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function(err, result){
				mongodb.close();
				if(err){
					res.send(err);
				}
				console.log('removing is successful');
				res.send(result[0]);
			});
		});
	});
};