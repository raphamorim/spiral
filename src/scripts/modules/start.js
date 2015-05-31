document.addEventListener('module-request', function(event){
  'use strict'
  var _ = null // all loDash here
  var spiral = event.spiral

  spiral.on('lodash-ready', function () {
    console.log('Lodash Ready')
  })

  event.spiral.add('lodash', _)
});
