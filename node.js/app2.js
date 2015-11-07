var express = require('express');
var app = express();
var web3 = require('web3');
web3.setProvider(new web3.providers.HttpProvider('http://iot.ethereumoxford.org:8545'));

function createOrder(req, res) {
var orderAbi = [{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"fileURL","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"customerID","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"printerID","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"_customerID","type":"uint256"},{"name":"_fileURL","type":"string"}],"type":"constructor"}];
var orderFactoryAbi = [{"constant":false,"inputs":[{"name":"_customerID","type":"uint256"},{"name":"_fileURL","type":"string"}],"name":"createOrder","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_Order","type":"address"}],"name":"addOrder","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"numOrders","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orders","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"latestOrder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"test","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[],"name":"startOrderEvent","type":"event"},{"anonymous":false,"inputs":[],"name":"endOrderEvent","type":"event"}];

var factoryContract = web3.eth.contract(orderFactoryAbi);

var orderFactory = factoryContract.at('0x24ad400ee4eeb5a7fbc67425b83957cd1ee0b277');

var filter = web3.eth.filter([orderFactory.startOrderEvent,orderFactory.endOrderEvent]);

filter.watch(eventTrapper);

orderFactory.addOrder.sendTransaction("0x24ad400ee4eeb5a7fbc67425b83957cd1ee0b277",{from: web3.eth.accounts[0]});

console.log("done send");

res.send("ok");


}


function eventTrapper(error,result){
console.log("Event happened");
console.log(error);
console.log(result);

}


app.use(express.static('static'));

app.get('/ajax/order', createOrder);

app.request.setMaxListeners(0);
app.listen(8887);

console.log("starting");
