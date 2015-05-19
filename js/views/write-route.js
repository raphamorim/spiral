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

  God.prototype.write = {
    
  }

  God.prototype.nextTick = function (god) {
    var route = God.prototype.States[location.hash] || {};

    if (Object.keys(route).length === 0) {
      God.prototype.States['#/404'].mount();
    }

    console.log('Get', this.get('defineRoute'))
  }

  var moduleInfo = {
    dependsOn: ['defineRoute'],
    God: God,
    moduleName: 'routes'
  };

  // Conecting module to the master
  emmitEvent('god-module-request', moduleInfo);
}())
