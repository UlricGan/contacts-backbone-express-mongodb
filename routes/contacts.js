var mongo=require('mongodb');
var Server=mongo.Server;
var Db=mongo.Db;
var BSON=mongo.BSONPure;

var server=new Server('localhost', 27017, {auto_reconnect: true});
var mongodb=new Db('contactsdb', server);

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
	console.log('add!!!');
	console.log(contact);
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
				console.log('add result is '+result[0]);
				res.send(result[0]);
			});
		});
	});

};

exports.updateCont=function(req, res){
	var contact=req.body,
		id=req.params.id;
	console.log(contact);
	contact._id=new BSON.ObjectID(contact._id);
	mongodb.open(function(err, db){
		if(err){
			res.send(err);
		}
		db.collection('contacts', function(err, collection){
			if(err){
				res.send(err);
			}
			console.log('collection!!!!');
			collection.update({'_id': new BSON.ObjectID(id)}, contact, {safe: true}, function(err, result){
				mongodb.close();
				if(err){
					res.send(err);
					console.log('update!!!!');
				}
				//console.log('update!!!!');
				//console.log('update result is '+result[0]);
				res.send(contact);
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
				console.log('remove result is '+result);
				res.send(result[0]);
			});
		});
	});
};