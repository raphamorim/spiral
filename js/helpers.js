;(function () {
  'use strict'

  var Methods = function () {

    return this
  },
  methods = new Methods()

  Methods.prototype.checkGlobals = function() {
    function Globals () {}

    var getWindow = function () {
      var iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      document.body.appendChild(iframe)

      var result = iframe.contentWindow || iframe.contentDocument

      iframe.parentElement.removeChild(iframe)

      return result
    }

    Globals.prototype.get = function() {
      var iframeWindow = getWindow()
      var result = []
      var property;

      // Window
      for (property in global) {
        if (!(property in iframeWindow)) {
          result.push(property)
        }
      }

      return result
    };

    console.log('Variáveis globais: ', new Globals().get())
  };

  // Create event e put the god in there
  var even = document.createEvent('Event')
  even.God = {}
  event.God.methods = methods;

  even.initEvent('god-module', true, true)
  document.dispatchEvent(even)
}())
