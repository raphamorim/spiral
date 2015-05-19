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

  God.prototype.nextTick = function (god) {
    // this.modules.forEach(function (value) {
    //   god.loadModule(value);
    // });
  }

  var moduleInfo = {
    dependsOn: [],
    God: God,
    moduleName: 'friendsList'
  };

  // Conecting module to the master
  emmitEvent('god-module-request', moduleInfo);
}())
