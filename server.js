var express = require('express');
var archive = require('archiver');
var fs = require('fs');

var app = new express();

app.get('/sample', function(req, res) {
  mkArchive(function(a) {
    res.set('Content-type', 'application/vnd.jhenning.zipfoo+xml');
    a.pipe(res);
  });
});

app.listen(3000, function() {console.log('I\'m listening...')});


function mkArchive(cb) {
  var a = archive('zip');
  a.append(fs.createReadStream(__dirname + '/demo.ods'), {name: 'sample.ods'});
  cb(a);
  a.finalize();
}
