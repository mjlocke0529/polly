var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

var params = {
	LexiconNames: [
	 "example"
	], 
	OutputFormat: "mp3", 
	SampleRate: "8000", 
	Text: "All Gaul is divided into three parts", 
	TextType: "text", 
	VoiceId: "Joanna"
	};
	polly.synthesizeSpeech(params, function(err, data) {
	if (err) console.log(err, err.stack); // an error occurred
	else     console.log(data);           // successful response
	res.send(data);
	/*
	data = {
	AudioStream: <Binary String>, 
	ContentType: "audio/mpeg", 
	RequestCharacters: 37
	}
	*/
	});

  
});



module.exports = router;
