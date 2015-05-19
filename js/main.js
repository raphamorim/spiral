(function (window, document) {
  'use strict'

  document.addEventListener('god-ready', function (e) {
    var god = new e.God()

    console.log('Aplicação iniciada')
    console.log(god.createMatrix(1, 1))
  }, false);
}(window, document))
