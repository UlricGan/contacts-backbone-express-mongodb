var mongodb=require('mongodb');
var setting=require('../config/setting');
var Db=mongodb.Db;
var Server=mongodb.Server;
var Connection=mongodb.Connection;

module.exports=new Db(setting.db, new Server(setting.host, Connection.DEFAULT_PORT), {safe: true});