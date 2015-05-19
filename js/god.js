;(function (global, document) {
  'use strict'

  // Constructor
  var Methods = function () {

    return this
  }

  // Create Matrix method
  Methods.prototype.createMatrix = function(x, y) {
    return [1, 1]
  }

  // Create event e put the god in there
  var even = document.createEvent('Event')
  even.god = {
    init: function () {
      console.log('init')
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Emmit de event
    even.initEvent('god-ready', true, true)
    document.dispatchEvent(even)
  }, false)
}(window, document))
