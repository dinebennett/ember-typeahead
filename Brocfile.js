var mergeTrees = require('broccoli-merge-trees');

var appTree    = mergeTrees(['app', 'app-addon'], { overwrite: true });
var vendorTree = mergeTrees(['bower_components', 'vendor-addon']);

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  trees: {
    app: appTree,
    vendor: vendorTree
  }
});

app.import('bower_components/ember-cli-typeahead/styles/style.css');
app.import('bower_components/ember-cli-typeahead/js/twitter-typeahead.js');
// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree();
