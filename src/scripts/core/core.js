;(function(window){

  'use strict'

  /**
   * Object do nosso core
   *
   * no @return
   */
  var Spiral = function () {
    this.modules = {}

    var events = {}, empty = [];

    /**
     *  On: listen to events
     */
    this.on = function(type, func, ctx){
      (events[type] = events[type] || []).push([func, ctx])
    }
    /**
     *  Off: stop listening to event / specific callback
     */
    this.off = function(type, func){
      type || (events = {})
      var list = events[type] || empty,
      i = list.length = func ? list.length : 0
      while(i--) func == list[i][0] && list.splice(i,1)
    }
    /**
     * Emit: send event, callbacks will be triggered
     */
    this.emit = function(type){
      var args = empty.slice.call(arguments, 1),
      list = events[type] || empty, i=0, j
      while(j=list[i++]) j[0].apply(j[1], args)
    };
  }

  /**
   * Pega a instance de um módulo
   *
   * @param {String} name - Nome do módulo (sem path)
   * @returns {Object} - Instancia do módulo requisitado
   */
  Spiral.prototype.use = function(name){
    var module = this.modules[name]

    return module || {}
  }

  /**
   * Itera pelos módulos executando uma função
   *
   * @param {function} func - Função a ser executada a cada módulo
   * no @return
   */
  Spiral.prototype.eachModule = function(func){
    var self = this

    Object.keys(this.modules).forEach(function(module, index){
      func.apply(self, [self.modules[module], module, index])
    })
  }

  /**
   * Registra um novo módulo
   *
   * @param {Object} module - Objeto de um módulo
   * no @return
   */
  Spiral.prototype.add = function(moduleName, module){

    if (this.modules[moduleName]) {
      return
    }

    this.modules[moduleName] = {
      name: moduleName,
      module: module
    }

    this.emit(moduleName + '-ready');
  }

  /**
   * Carrega um módulos e listas de módulos
   *
   * @param {String|Array|Object} moduleRepresentation - Nome ou Path do module a ser carregado ou uma lista de nomes e paths
   * no @return
   */
  Spiral.prototype.loadModule = function(moduleRepresentation){

    var self = this

    var actionsForEachType = {

      /**
       * Carrega um module pelo nome ou path
       *
       * @param {String} module - Nome ou Path do module a ser carregado
       * no @return
       */
      string: function(module){
        var script = document.createElement('script')

        script.src = module + '.js'

        script.addEventListener('load', function(event){
          Spiral.prototype.emmitToDocument.apply(spiral, ['module-request'])
        }, false)

        script.addEventListener('error', function(event){
          var src = event.target.getAttribute('src')

          console.log('error loading '. src, event)

          //remove all script tags in a apropriate moment
          //i don't know what is this moment right now
          //script.parentElement.removeChild(script)
        }, false)

        document.body.appendChild(script)
      },

      /**
       * Itera por Array ou Objeto de módulo e chamada loadModule para cada módulo
       *
       * @param {Object} moduleRepresentation - Nada mais que um Array ou Object de modules
       * no @return
       */
      object: function(moduleRepresentation){
        Object.keys(moduleRepresentation).forEach(function(moduleIndex){
          Spiral.prototype.loadModule.apply(spiral, [moduleRepresentation[moduleIndex]])
        })
      }
    }

    var action = actionsForEachType[ (typeof moduleRepresentation).toLowerCase() ] || function(){}

    action(moduleRepresentation)
  }

  /**
   * @param {string} eventName - Nome do evento a ser disparado
   * @param {Object} data - Instância da Spiral para recepcionar um módulo
   * no @return
   */
  Spiral.prototype.emmitToDocument = function(eventName, data){

    var fireOnThis = document

    if( document.createEvent ) {
      var evObj = document.createEvent('MouseEvents')
      evObj.spiral = spiral
      evObj.spiralTransfer = data
      evObj.initEvent( eventName, true, false )
      fireOnThis.dispatchEvent( evObj )
    } else if (document.createEventObject) { //ie
      var evObj = document.createEventObject()
      evObj.spiral = spiral
      evObj.spiralTransfer = data
      fireOnThis.fireEvent( 'on' + eventName, evObj )
    }
  }

  /*
    init aplication
  */
  var spiral = new Spiral()

  spiral.loadModule(['scripts/modules/start'])
}(window))
