var orderAbi=[{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[],"name":"OrderIsNew","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"fileURL","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"customerID","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"remove","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"OrderIsFinished","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"printerID","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_printerID","type":"uint256"}],"name":"isMyOrder","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_printerID","type":"uint256"}],"name":"acceptOrder","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"OrderIsPrinting","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[{"name":"_customerID","type":"uint256"},{"name":"_fileURL","type":"string"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"printerID","type":"uint256"}],"name":"jobClaimed","type":"event"}];

var factoryAbi  = [{"constant":false,"inputs":[{"name":"_customerID","type":"uint256"},{"name":"_fileURL","type":"string"}],"name":"createOrder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_Order","type":"address"}],"name":"addOrder","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"numOrders","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orders","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"latestOrder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"getNextNewOrder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"test","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"Order","type":"address"}],"name":"jobSubmitted","type":"event"}]



var orderFactoryAddress = "0xfdb766f43f94e001976e6634a8eb5f25c12b4e7e";
var orderFactoryContract = web3.eth.contract(factoryAbi);
var orderFactory = orderFactoryContract.at(orderFactoryAddress);
var event = orderFactory.jobSubmitted({Order: 23} );
event.watch(function(error, result){
  if (!error)
    console.log(orderFactory.latestOrder.call());
    var orderContract = web3.eth.contract(orderAbi);

    var order = orderContract.at(orderFactory.latestOrder.call());
  console.log(order.fileURL.call());

});

function addOrder(customerID,fileURL){
	orderFactory.createOrder.sendTransaction(customerID,fileURL, {from: eth.accounts[0],gas: 1000000});


}


