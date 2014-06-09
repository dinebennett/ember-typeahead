(function() {
  var substringMatcher = function(data, key) {
    return function findMatches(q, cb) {
      var matches = [],  substrRegex = new RegExp(q, 'i');

      // iterate through objects to match the matching
      $.each(data, function(i, obj) {
        var str = obj;
        if (!Em.isEmpty(obj.get)) {
          str = Em.isEmpty(obj.get('key')) ? obj : obj.get('key');
        } else {
          str = Em.isEmpty(obj[key]) ? obj : obj[key];
        }
        if (substrRegex.test(str)) {
          var x = {obj: obj};
          x[key] = str;
          matches.push(x);
        }
      });

      cb(matches);
    };
  };

  Em.TypeaheadComponent = Em.TextField.extend({
    highlight: false,
    hint: true,
    minLength: 1,
    autofocus: true,
    _typeahead: null,
    selection: null,
    didInsertElement: function() {
      this._super();
      this.initializeTypeahead();
      if (this.get('autofocus') === true) {
        this.$().focus();
      }
    },
    initializeTypeahead: function() {
      var that=this, t=null,
          options = {
            highlight: this.get('highlight'),
            hint: this.get('hint'),
            minLength: this.get('minLength')
          },
          dataset = this.get('dataset');
      t = this.$().typeahead(options, dataset);
      this.set('_typeahead', t);

      // Set selected object
      t.on('typeahead:selected', function(event, item) {
        Em.debug("Setting suggestion");
        that.set('selection', item.obj);
      });

      t.on('typeahead:autocompleted', function(event, item) {
        Em.debug("Setting suggestion");
        that.set('selection', item.obj);
      });
    },
    dataset: function() {
      var that=this, content=this.get('content');

      if (jQuery.isFunction(content.then)) {
        content.then(function(data) {
          return that.loadDataset(data);
        });
      } else {
        return this.loadDataset(content);
      }
    }.property(),
    loadDataset: function(content) {
      var name = this.get('name') || 'default',
          key = this.get('displayKey') || 'value';
      return {
        name: name,
        displayKey: key,
        source: substringMatcher(content, key)
      };
    }
  });

  Em.Handlebars.helper('type-ahead', Em.TypeaheadComponent);
})();
