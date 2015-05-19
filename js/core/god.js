// A base de tudo
;(function () {

  var God = function () {

    return this;
  }

  var god = new God();

  god.runtime = (function () {

    var fila = [],
        modulesList = {},
        methods = {};

    methods.loadModule = function (module) {
      var indice = fila.push(module)
      // Poderiamos disparar hookies aqui, tipo para customização por exemplo
      methods.dispatchComponent(indice, module);
    };

    methods.removeModule = function (module) {
      console.log('removeModule');
      debugger
    };

    methods.dispatchComponent = function (indice, module) {
      var script=document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', 'js/' + module + '.js');

      document.body.appendChild(script)
    };

    methods.welcomeModule = function (moduleInfo) {
      var module = moduleInfo.dependsOn.every(function (module) {
        return !!methods.get(module)
      })

      if (module) {
        modulesList[moduleInfo.moduleName] = new moduleInfo.God()
      }

      modulesList[moduleInfo.moduleName].nextTick(this, methods);
    }

    methods.get = function (moduleName) {
      return modulesList[moduleName]
    }

    return methods;
  }());

  document.addEventListener('god-module-request', function (event) {
    god.runtime.welcomeModule(event.God.moduleInfo);
  }, false)

  god.runtime.loadModule('god-modules')
}())
