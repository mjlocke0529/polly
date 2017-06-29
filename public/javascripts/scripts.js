$('#form').submit(function(event) {
  // Stop form from submitting normally
  event.preventDefault();

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContext();  

  const request = new XMLHttpRequest();
  request.open('POST', '/api/play', true);
  request.responseType = 'arraybuffer';
  request.onload = function onLoad() {
    const Data = request.response;
    const source = context.createBufferSource(); 
    context.decodeAudioData(Data, (buffer) => {
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(context.currentTime);
    });
  };
  console.log(JSON.stringify({text: $("#text").val(),voice: $("#voice").val()}));
  request.setRequestHeader(
   'Content-Type', 'application/json;charset=UTF-8');
  request.send(JSON.stringify({text: $("#text").val(),voice: $("#voice").val()}));


});
