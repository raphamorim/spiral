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

    this.States = {
      '#/home': '',
      '#/frind-list': '',
      '#/404': ''
    }

    return this
  };

  God.prototype.nextTick = function (god) {
    var route = this.States[location.hash] || {};

    if (Object.keys(route).length === 0) {
      console.log('view: ', God.prototype.States['#/404'])
    }
  }

  var moduleInfo = {
    dependsOn: ['defineRoute', 'core/renderState'],
    God: God,
    moduleName: 'routes'
  };

  // Conecting module to the master
  emmitEvent('god-module-request', moduleInfo);
}())
