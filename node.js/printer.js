var web3 = require('web3');
web3.setProvider(new web3.providers.HttpProvider('http://iot.ethereumoxford.org:8545'));

var util = require('util'),
    exec = require('child_process').exec,
    child;

//child = exec("xdg-open 'http://www.thingiverse.com/thing:555330'", // command line argument directly in string
// function (error, stdout, stderr) {      // one easy function to capture data/errors
//   console.log('stdout: ' + stdout);
//   console.log('stderr: ' + stderr);
//   if (error !== null) {
//     console.log('exec error: ' + error);
//   }
//});

var util  = require('util'),
    spawn = require('child_process').spawn,
    open    = spawn('sh', ['print.sh']); // the second arg is the command 
                                          // options

open.stdout.on('data', function (data) {    // register one or more handlers
  console.log('stdout: ' + data);
});

open.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

open.on('exit', function (code) {
  console.log('child process exited with code ' + code);
});
