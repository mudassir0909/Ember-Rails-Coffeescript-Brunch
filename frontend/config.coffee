fs      = require 'fs'
sysPath = require 'path'

# See docs at http://brunch.readthedocs.org/en/latest/config.html.

exports.config = 
  
  paths:
    public: '../backend/public/'
  
  files:   
    javascripts: 
      defaultExtension: 'coffee',
      joinTo: 
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/

      order: 
        before: [
          'vendor/scripts/console-helper.js',
          'vendor/scripts/jquery-1.9.0.min.js',
          'vendor/scripts/handlebars-1.0.rc.2.js',
          'vendor/scripts/ember-latest.js',
          'vendor/scripts/ember-data-latest.js',
          'vendor/scripts/metro_ui/accordion.js',
          'vendor/scripts/metro_ui/buttonset.js',
          'vendor/scripts/metro_ui/calendar.js',
          'vendor/scripts/metro_ui/carousel.js',
          'vendor/scripts/metro_ui/dialog.js',
          'vendor/scripts/metro_ui/dropdown.js',
          'vendor/scripts/metro_ui/input-control.js',
          'vendor/scripts/metro_ui/pagecontrol.js',
          'vendor/scripts/metro_ui/rating.js',
          'vendor/scripts/metro_ui/slider.js',
          'vendor/scripts/metro_ui/tile-drag.js',
          'vendor/scripts/metro_ui/tile-slider.js'
          ]

    stylesheets:
      defaultExtension: 'css'
      joinTo: 'stylesheets/app.css'
      order:
       before: [
         'vendor/styles/modern.css',
         'vendor/styles/modern-responsive.css'
       ]
    templates:
      precompile: true
      root: 'templates'
      defaultExtension: 'hbs'
      joinTo: 'javascripts/app.js' : /^app/

  modules:
    addSourceURLs: true

  # allow _ prefixed templates so partials work
  conventions:
    ignored: (path) ->
      startsWith = (string, substring) ->
        string.indexOf(substring, 0) is 0
      sep = sysPath.sep
      if path.indexOf("app#{sep}templates#{sep}") is 0
        false
      else
        startsWith sysPath.basename(path), '_'

  server:
    port: 3333
    base: '/'
    run: no

