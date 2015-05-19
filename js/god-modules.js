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

  God.prototype.modules = [
    'modules/createMatrix',
    'modules/friendsList',
    'modules/defineRoute',
    'core/renderState',
    'views/routes'
  ]

  // Carrega lista modules
  God.prototype.nextTick = function (god, runtime) {
    var self = this;

    this.modules.forEach(function (value) {
      runtime.loadModule(value);
    });
  }

  var moduleInfo = {
    dependsOn: [],
    God: God,
    moduleName: 'god-modules'
  };

  // Conecting module to the master
  emmitEvent('god-module-request', moduleInfo);
}())
