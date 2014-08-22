var express = require('express');
var app = express();
var cron = require('cron').CronJob;
var prufrock = require('prufrock');
var i = 0;

function updateLetter(index) {
  return prufrock[index];
};

app.get('/', function(req, res){
  res.send(updateLetter(i));
});



app.set('port', (process.env.PORT || 9000));

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port %d', server.address().port)
  var cronjob = new cron('*/3 * * * * *', function(){

    updateLetter(i);
    console.log(updateLetter(i));
    if (i > 137) {
      i = 0
    } else {
      i++;
    }


  }, null, true);
});