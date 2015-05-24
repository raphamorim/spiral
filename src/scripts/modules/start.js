(function(){
  'use strict'

  /**
   * Objeto do módulo
   *
   * @param {Object} spiral - InspiralInstance
   */
  var Start = function(spiral){
    document.addEventListener('startModuleReady', function(){
      console.log('Olá')
    })
  }

  document.addEventListener('registerNewModule', function(event){
    event.spiral.registerNewModule({
      _init: Start,
      name: 'start'
    })
  })
}())
