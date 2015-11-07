var web3 = require('web3');
web3.setProvider(new web3.providers.HttpProvider('http://iot.ethereumoxford.org:8545'));

var orderAbi=[{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[],"name":"OrderIsNew","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"fileURL","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"customerID","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"remove","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"OrderIsFinished","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"printerID","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_printerID","type":"uint256"}],"name":"isMyOrder","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_printerID","type":"uint256"}],"name":"acceptOrder","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"OrderIsPrinting","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[{"name":"_customerID","type":"uint256"},{"name":"_fileURL","type":"string"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"printerID","type":"uint256"}],"name":"jobClaimed","type":"event"}];

var factoryAbi  = [{"constant":false,"inputs":[{"name":"_customerID","type":"uint256"},{"name":"_fileURL","type":"string"}],"name":"createOrder","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_Order","type":"address"}],"name":"addOrder","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"numOrders","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orders","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"latestOrder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"getNextNewOrder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"test","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"Order","type":"address"}],"name":"jobSubmitted","type":"event"}]



var orderFactoryAddress = "0x5808d7ef58f7c1eca7b47e9beee9a2d076a3aa5c";
var orderFactoryContract = web3.eth.contract(factoryAbi);
var orderFactory = orderFactoryContract.at(orderFactoryAddress);
var event = orderFactory.jobSubmitted({Order: 23} );

var util = require('util'),
    spawn = require('child_process').spawn;

event.watch(function(error, result){
  if (!error) {
    console.log(orderFactory.latestOrder.call());
    var orderContract = web3.eth.contract(orderAbi);

    var order = orderContract.at(orderFactory.latestOrder.call());
    var file = order.fileURL.call();
	console.log(file);
	print(file);
	}

});

function print(file) {


	open  = spawn('sh', ['print.sh', file]); // the second arg is the command 
	                                          // options

	open.stdout.on('data', function (data) {    // register one or more handlers
	  console.log('stdout: ' + data);
	});

	open.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
	  //error
	});

	open.on('exit', function (code) {
	  console.log('Printing finished exited with code ' + code);
	  //finished

	});
}
