;(function () {
  'use strict'

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
    var iframeWindow = getWindow(),
        result = []
        property

    // Window
    for (property in global) {
      if (!(property in iframeWindow)) {
        result.push(property)
      }
    }

    return result
  }

  document.addEventListener('registerNewModule', function (event) {
    event.circular.registerNewModule({
      _init: Globals,
      name: 'globals'
    })
  })
}())
