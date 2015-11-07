var web3 = require('web3');
web3.setProvider(new web3.providers.HttpProvider('http://iot.ethereumoxford.org:8545'));

var util = require('util'),
    exec = require('child_process').exec,
    child;


open  = spawn('sh', ['print.sh']); // the second arg is the command 
                                          // options

open.stdout.on('data', function (data) {    // register one or more handlers
  console.log('stdout: ' + data);
});

open.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
  //error I think
});

open.on('exit', function (code) {
  console.log('child process exited with code ' + code);
  //
});
