(function(){
  'use strict'

  var Start = function(circular){
    document.addEventListener('startModuleReady', function(){
      console.log('Olá')
    })
  }

  document.addEventListener('registerNewModule', function(event){
    event.circular.registerNewModule({
      _init: Start,
      name: 'start'
    })
  })
}())
