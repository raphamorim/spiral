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

  God.prototype.getCurrent = function () {
    return location.hash
  }

  God.prototype.nextTick = function (god) {
    // this.modules.forEach(function (value) {
    //   god.loadModule(value);
    // });
  }

  var moduleInfo = {
    dependsOn: [],
    God: God,
    moduleName: 'defineRoute'
  };

  // Conecting module to the master
  emmitEvent('god-module-request', moduleInfo);
}())
