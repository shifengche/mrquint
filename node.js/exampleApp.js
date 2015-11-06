var express = require('express');
var app = express();
var web3 = require('web3');

web3.setProvider(new web3.providers.HttpProvider('http://iot.ethereumoxford.org:8545'));

function getBalance(req, res) {

console.log("Getting Balance");


var bal = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), "ether");

console.log("got balance of "+bal);

res.send(bal);



}



app.use(express.static('static'));

app.get('/ajax/balance', getBalance);

app.request.setMaxListeners(0);
app.listen(8888);

console.log("starting");
