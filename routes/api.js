var express = require('express');
var stream = require('stream');
var router = express.Router();
// import entire SDK 
var AWS = require('aws-sdk');
// import AWS object without services 
var AWS = require('aws-sdk/global');
// import individual service 

var polly = new AWS.Polly({region: 'us-east-1'});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/play', function(req, res, next) {

var params = {
	OutputFormat: "mp3", 
	SampleRate: "8000", 
	Text: req.body.text, 
	TextType: "text", 
	VoiceId: req.body.voice
	};
	polly.synthesizeSpeech(params, function(err, data) {
	if (err) console.log(err, err.stack); // an error occurred
	else     console.log(data);           // successful response
	  const bufferStream = new stream.PassThrough();
      bufferStream.end(new Buffer(data.AudioStream));
      // Make sure to set your content type
      res.set({
        'Content-Type': 'audio/mpeg',
      });
      // If the stream fails at all, make sure you end the stream. 
      bufferStream.on('error', bufferError => {
        res.status(400).end();
      });
      
      // Pipe it to something else  (i.e. stdout)
      bufferStream.pipe(res);
	});

  
});


module.exports = router;
