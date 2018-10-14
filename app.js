var express = require('express');
var session = require ('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var app = express()
var store = new MongoDBStore({
	uri:'mongodb://localhost:27017/TradeStuffSessions',
	collection: 'Sessions'
});

store.on('connected', function() {
	store.client;
});

store.on('error', function(error) {
	assert.ifError(error);
	assert.ok(false);
});

app.use(require('express-session')({
	secret: 'This is a secret',
	cookie: { maxAge: 1000 * 60 * 5 },
	store: store,
	resave: true,
	saveUninitialized: true
}));

app.get('/', function(req, res) {
	res.send('Hello' + JSON.stringify( req.session));
});

server = app.listen(3000);



