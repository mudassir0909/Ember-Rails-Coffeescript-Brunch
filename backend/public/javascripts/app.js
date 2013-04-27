(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("app", Function('exports, require, module', "module.exports = Ember.Application.create();\n\n//@ sourceURL=app.coffee"));
window.require.register("controllers", Function('exports, require, module', "\n\n//@ sourceURL=controllers.coffee"));
window.require.register("initialize", Function('exports, require, module', "window.App = require('app');\n\nrequire('templates');\n\nrequire('controllers');\n\nrequire('models');\n\nrequire('routes');\n\nrequire('router');\n\nrequire('store');\n\nApp.initialize();\n\n//@ sourceURL=initialize.coffee"));
window.require.register("models", Function('exports, require, module', "\n\n//@ sourceURL=models.coffee"));
window.require.register("router", Function('exports, require, module', "var App;\n\nApp = require(\"app\");\n\nApp.Router.map(function() {\n  this.route('index', {\n    path: '/'\n  });\n  return this.route('home', {\n    path: '/home'\n  });\n});\n\n//@ sourceURL=router.coffee"));
window.require.register("routes", Function('exports, require, module', "require(\"routes/index_route\");\n\n//@ sourceURL=routes.coffee"));
window.require.register("routes/index_route", Function('exports, require, module', "App.IndexRoute = Ember.Route.extend({\n  redirect: function() {\n    return this.transitionTo('home');\n  }\n});\n\n//@ sourceURL=routes/index_route.coffee"));
window.require.register("store", Function('exports, require, module', "var App;\n\nApp = require(\"app\");\n\nApp.Store = DS.Store.extend({\n  revision: 11\n});\n\n//@ sourceURL=store.coffee"));
window.require.register("templates", Function('exports, require, module', "require(\"templates/application\");\n\nrequire(\"templates/home\");\n\n//@ sourceURL=templates.coffee"));
window.require.register("templates/application", Function('exports, require, module', "module.exports = Ember.TEMPLATES[module.id.replace('templates/','')] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [2,'>= 1.0.0-rc.3'];\nhelpers = helpers || Ember.Handlebars.helpers; data = data || {};\n  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;\n\n\n  data.buffer.push(\"<div class=\\\"container-fluid\\\">\\n  <div class=\\\"hero-unit\\\">\\n    Application View\\n    <div class=\\\"well\\\">\\n      \");\n  hashTypes = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"outlet\", {hash:{},contexts:[depth0],types:[\"ID\"],hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n    </div>\\n  </div>\\n</div>\");\n  return buffer;\n  \n});\n//@ sourceURL=templates/application.hbs"));
window.require.register("templates/home", Function('exports, require, module', "module.exports = Ember.TEMPLATES[module.id.replace('templates/','')] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [2,'>= 1.0.0-rc.3'];\nhelpers = helpers || Ember.Handlebars.helpers; data = data || {};\n  \n\n\n  data.buffer.push(\"<ul class=\\\"unstyled\\\">\\n  <li>EmberJS <i class=\\\"icon-ok\\\"></i></li>\\n  <li>CoffeeScript <i class=\\\"icon-ok\\\"></i></li>\\n  <li>Brunch <i class=\\\"icon-ok\\\"></i></li>\\n  <li>SASS <i class=\\\"icon-ok\\\"></i></li>\\n  <li>Twitter-Bootstrap <i class=\\\"icon-ok\\\"></i></li>\\n  <li>Rails Backend <i class=\\\"icon-ok\\\"></i></li>\\n</ul>\");\n  \n});\n//@ sourceURL=templates/home.hbs"));
window.require.register("views", Function('exports, require, module', "\n\n//@ sourceURL=views.coffee"));
