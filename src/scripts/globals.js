;(function(global){
  'use strict'

  /**
   * Object do nosso módulo
   *
   * no @return
   */
  function Globals(){}

  Globals.prototype.dependencies = ['scripts/core/observables']

  /**
   * Retorna Object Window do contexto de um iframe
   *
   * @returns {Object} - Window object do contexto do iframe
   */
  var getWindow = function(){
    var iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    var result = iframe.contentWindow || iframe.contentDocument

    iframe.parentElement.removeChild(iframe)

    return result
  }

  /**
   * Pega nome das variáveis globais
   *
   * @returns {Array} - Lista de nomes de variáveis globais
   */
  Globals.prototype.get = function(){
    var iframeWindow = getWindow()
    var result = []
    var property

    //window
    for (property in global) {
      if (!(property in iframeWindow)) {
        result.push(property)
      }
    }

    return result
  }

  document.addEventListener('registerNewModule', function(event){
    event.spiral.registerNewModule({
      _init: Globals,
      name: 'globals'
    })
  })
}(window))
