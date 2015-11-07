var express = require('express');
var app = express();
var web3 = require('web3');
var server = require('http').Server(app);
var io = require('socket.io')(server);

web3.setProvider(new web3.providers.HttpProvider('http://iot.ethereumoxford.org:8545'));

function getBalance(req, res) {

console.log("Getting Balance");


var bal = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), "ether");

console.log("got balance of "+bal);

res.send(bal);

}

function gotDesign(req, res) {
	console.log("Got requrest from customer");
	console.log(req.query.customerID);
	console.log("Got requrest for design");
	console.log(req.query.fileURL);
	res.send(req.query.fileURL);
}



app.use(express.static('../static'));

app.get('/ajax/balance', getBalance);

app.get('/ajax/design', gotDesign);

app.request.setMaxListeners(0);
app.listen(8888);

// Socket code
var connections = [];
io.on('connection', function(socket) {
  connections.push(socket);
  socket.on('disconnect', function() {
    connections.splice(connections.indexOf(socket), 1);
  });
});

function sendGethData(data) {
  io.emit('geth_data', data);
}

console.log("starting");

