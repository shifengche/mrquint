var express = require('express');
var app = express();
var web3 = require('web3');
//var http = require('http');
//var io = require('socket.io')(http);
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.set('origins', 'http://localhost:8888');

var orderAbi=[{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[],"name":"OrderIsNew","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"fileURL","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"customerID","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"remove","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"OrderIsFinished","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"printerID","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_printerID","type":"uint256"}],"name":"isMyOrder","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_printerID","type":"uint256"}],"name":"acceptOrder","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"OrderIsPrinting","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[{"name":"_customerID","type":"uint256"},{"name":"_fileURL","type":"string"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"printerID","type":"uint256"}],"name":"jobClaimed","type":"event"}];

var factoryAbi  = [{"constant":false,"inputs":[{"name":"_customerID","type":"uint256"},{"name":"_fileURL","type":"string"}],"name":"createOrder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_Order","type":"address"}],"name":"addOrder","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"numOrders","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orders","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"latestOrder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"getNextNewOrder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"test","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"Order","type":"address"}],"name":"jobSubmitted","type":"event"}]



var orderFactoryAddress = "0xfdb766f43f94e001976e6634a8eb5f25c12b4e7e";
var orderFactoryContract = web3.eth.contract(factoryAbi);
var orderFactory = orderFactoryContract.at(orderFactoryAddress);
var event = orderFactory.jobSubmitted({Order: 23} );

web3.setProvider(new web3.providers.HttpProvider('http://iot.ethereumoxford.org:8545'));

function getBalance(req, res) {

console.log("Getting Balance");


var bal = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), "ether");

console.log("got balance of "+bal);

res.send(bal);

}

function addOrder(customerID,fileURL){
	var orderID = orderFactory.createOrder.sendTransaction(customerID,fileURL, {from: web3.eth.accounts[0],gas: 1000000});
	console.log(orderID);
	return orderID;

}

var orderID;

function sendDesign(req, res) {
	console.log("Got requrest from customer");
	console.log(req.query.customerID);
	console.log("Got requrest for design");
	console.log(req.query.fileURL);

	orderID = addOrder(req.query.customerID, req.query.fileURL);
	sendGethData("Printing");
	res.send(orderID);

}



app.use(express.static('../static'));

app.get('/ajax/balance', getBalance);

app.get('/ajax/design', sendDesign);

app.request.setMaxListeners(0);
//app.listen(8888);
server.listen(8888);

// Socket code
var connections = [];
io.on('connection', function(socket) {
  connections.push(socket);
  socket.on('disconnect', function() {
    connections.splice(connections.indexOf(socket), 1);
  });
});

//event.watch

event.watch(function(error, result){
  if (!error) {
	    console.log(orderFactory.latestOrder.call());
	    var orderContract = web3.eth.contract(orderAbi);

		var order = orderContract.at(orderID);
		console.log(order.fileURL.call());
		var newStatus;
		switch (order.status.call()) {
			case 1:
				newStatus = "NewOrder";
				break;
			case 2:
				newStatus = "Printing";
				break;
			case 3:
				newStatus = "Finished";
				break;
			case 4:
				newStatus = "Error";
				break;

		}
		sendGethData(newStatus);
	}

});

function sendGethData(data) {
  io.emit('status_data', data);
}

console.log("starting");

