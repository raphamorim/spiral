/*
# 1 - Avisar a chegada, pedir API
# 2 - Validar chegada do modulo, resolver rotas
# 3 - Alocar components estáticos
# 4 - Aguardar até o routes.js
*/

;(function (dep) {

  var start = function (circular) {

    document.addEventListener('startModuleReady', function (event) {
      // This should be logged once
      console.log('hi from start')
    })
  }

  start.prototype.dependencies = [
    'js/globals'
  ]

  document.addEventListener('registerNewModule', function (event) {
    event.circular.registerNewModule({
      name: 'start',
      _init: start
    })
  })
}([]))
