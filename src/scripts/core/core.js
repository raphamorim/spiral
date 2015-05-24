;(function(){

  'use strict'

  var Circular = function(){
    this.modules = {}
  }
  var circular

  /*
    return module instance

    @module: String = module name
  */
  Circular.prototype.use = function(name){
    var module = this.modules[name]

    if (module) {
      //throw('Module ' + module + ' not available')
    }

    return module || {}
  }

  /*
    rxecute a function on each module

    @func: Function
  */
  Circular.prototype.eachModule = function(func){
    var self = this

    Object.keys(this.modules).forEach(function(module){
      func.apply(self, [self.use(module)])
    })
  }

  /*
    register a new/loaded module

    @moduleDefinition: ObjectModuleDefinition = Module definition
  */
  Circular.prototype.registerNewModule = function(moduleDefinition){

    var instance

    var init = moduleDefinition._init || function(){ return moduleDefinition._var }

    if (moduleDefinition._init) {
      instance = new moduleDefinition._init(circular)
    } else if (moduleDefinition._var) {
      instance = {
        name: moduleDefinition.name,
        _var: moduleDefinition._var
      }
    }

    instance.name = moduleDefinition.name

    var instanteStatus = this.use(moduleDefinition.name).status

    if ('loading' === instanteStatus) {

      instance.status = 'loaded'

      this.modules[moduleDefinition.name] = instance

      Circular.prototype.checkModuleDependencies.apply(circular)
    }
  }

  /*
    get module name from path
  */
  Circular.prototype.getModuleName = function(path){
    return path.split('/').pop().split('.js').shift()
  }

  /*
    check/notify each module if it's dependencies is completely loaded
  */
  Circular.prototype.checkModuleDependencies = function(){
    var self = this

    self.eachModule(function(module){
      var deps = module.dependencies || []

      var allLoaded = self.isAllLoaded(module.dependencies)

      if (allLoaded) {
        module.moduleReady = true
        console.log(module.name, 'Emmit event this module is ready to run')
        self.emmit(module.name + 'ModuleReady')
      } else {
        self.loadModule(deps)
      }
    })
  }

  Circular.prototype.isAllLoaded = function(dependencies){

    var self = this

    dependencies = dependencies || []

    var result = true

    dependencies.forEach(function(value){
      if (!(self.getModuleName(value) in self.modules)) {
        result = false
      }
    }, 0)

    return result
  }

  /*
    load a module

    @module: String = path to JavaScript file
  */
  Circular.prototype.loadModule = function(moduleRepresentation){

    var self = this

    var actionsForEachType = {
      string: function(module){
        var moduleName = self.getModuleName(module)
        var script = document.createElement('script')

        if (!!self.use(moduleName).status) {
          return
        }

        self.modules[moduleName] = {
          status: 'loading'
        }

        script.src = module + '.js'

        script.addEventListener('load', function(event){
          Circular.prototype.loadModuleComplete.apply(circular, [event, script, moduleName])
        }, false)

        script.addEventListener('error', function(event){
          var src = event.target.getAttribute('src')

          moduleName = self.getModuleName(src)

          Circular.prototype.loadModuleError.apply(circular, [event, script, moduleName])
        }, false)

        document.body.appendChild(script)
      },
      object: function(moduleRepresentation){
        Object.keys(moduleRepresentation).forEach(function(moduleIndex){
          Circular.prototype.loadModule.apply(circular, [moduleRepresentation[moduleIndex]])
        })
      }
    }

    var action = actionsForEachType[ (typeof moduleRepresentation).toLowerCase() ] || function(){}

    action(moduleRepresentation)
  }

  /*
    when a module is loaded
  */
  Circular.prototype.loadModuleComplete = function(event, script, moduleName){
    Circular.prototype.emmit.apply(circular, ['registerNewModule'])

    //remove all script tags in a apropriate moment
    //i don't know what is this moment right now
    //script.parentElement.removeChild(script)
  }

  /*
    when a error occurs while loading a module
  */
  Circular.prototype.loadModuleError = function(event, script, moduleName){
    var module = this.use(moduleName)

    if (!module) {
      return
    }

    module.status = 'error'

    //remove all script tags in a apropriate moment
    //i don't know what is this moment right now
    //script.parentElement.removeChild(script)
  }

  /*
    fire events to `document`

    @eventName: String = Event name as event definition patterns
  */
  Circular.prototype.emmit = function(eventName){

    var fireOnThis = document

    if( document.createEvent ) {
      var evObj = document.createEvent('MouseEvents')
      evObj.circular = circular
      evObj.initEvent( eventName, true, false )
      fireOnThis.dispatchEvent( evObj )
    } else if (document.createEventObject) { //ie
      var evObj = document.createEventObject()
      fireOnThis.fireEvent( 'on' + eventName, evObj )
    }
  }

  /*
    init aplication
  */
  circular = new Circular()

  circular.loadModule(['scripts/modules/start'])
}())
