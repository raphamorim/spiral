/*
# 1 - Avisar a chegada, pedir API
# 2 - Validar chegada do modulo, resolver rotas
# 3 - Alocar components estáticos
# 4 - Aguardar até o routes.js
*/

;(function () {
  var emmitEvent = function (eventName, moduleInfo) {
    var even = document.createEvent('Event');
    even.God = {
      moduleInfo: moduleInfo
    };
    even.initEvent(eventName, true, true);
    document.dispatchEvent(even);
  };

  var God = function () {
    return this
  };

  God.prototype.renderState = function(route) {

  }

  God.prototype.render = function(route) {

  }

  God.prototype.nextTick = function (god) {}

  var moduleInfo = {
    dependsOn: [],
    God: God,
    moduleName: 'renderState'
  };

  // Conecting module to the master
  emmitEvent('god-module-request', moduleInfo);
}())
