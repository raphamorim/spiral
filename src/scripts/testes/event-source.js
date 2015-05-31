if (!!window.EventSource) {
  var source = new EventSource('http://localhost:3000/');
} else {
  // Result to xhr polling :(
}

source.addEventListener('message', function(e) {
  console.log('message', e)
  // debugger;
}, false);

source.addEventListener('open', function(e) {
  console.log('conection open', e)
}, false);

source.addEventListener('error', function(e) {
  if (e.readyState == EventSource.CLOSED) {
    console.log('error', e)
    debugger;
  }
}, false);
