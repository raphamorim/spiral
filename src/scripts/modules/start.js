(function(){
  'use strict'

  /**
   * Objeto do módulo
   *
   * @param {Object} spiral - InspiralInstance
   */
  var Start = function(spiral){

    var self = this

    console.log('start created')

    spiral.once('startModuleReady', function(event){
      var wrapper = document.createElement('div')

      wrapper.classList.add('ui-header')

      var title = document.createElement('h2')

      title.innerText = 'Olá'

      wrapper.appendChild(title)

      document.body.appendChild(wrapper)
    })
  }

  Start.prototype.dependencies = ['scripts/globals']

  document.addEventListener('registerNewModule', function(event){
    event.spiral.registerNewModule({
      _init: Start,
      name: 'start'
    })
  })
}())
