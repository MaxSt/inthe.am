var App = require('./app');

Ember.Handlebars.helper('comma_to_list', function(item, options){
  return item.split(',');
});

Ember.Handlebars.helper('propercase', function(project_name, options) {
  if (project_name) {
    var properCase = function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    };
    return project_name.replace('_', ' ').replace(/\w\S*/g, properCase);
  }
});

Ember.Handlebars.helper('calendar', function(date, options) {
  if (date) {
    return new Handlebars.SafeString('<span class="calendar date" title="' + moment(date).format('LLLL') + '">' + moment(date).calendar() + "</span>");
  }
});

Ember.Handlebars.helper('fromnow', function(date, options) {
  if (date) {
    return new Handlebars.SafeString('<span class="calendar date" title="' + moment(date).format('LLLL') + '">' + moment(date).fromNow() + "</span>");
  }
});

Ember.Handlebars.helper('markdown', function(html) {
  return new Handlebars.SafeString(linkify(markdown.toHTML(html)));
});


Ember.Handlebars.helper('renderUDAValue', function(uda) {
  if(uda.type == 'DateField') {
    if (uda.value) {
      return new Handlebars.SafeString(
        '<span class="calendar date" title="' + moment(uda.value).format('LLLL') + '">' + moment(uda.value).calendar() + "</span>"
      );
    }
  } else if (uda.type == 'StringField') {
    return new Handlebars.SafeString(linkify(markdown.toHTML(uda.value)));
  }
  return uda.value;
});

Ember.Handlebars.registerBoundHelper('mailto', function (emailAddress, label, option) {
  if(typeof(label) == 'object') {
    option = label;
  }
  if(option.hash.suffix) {
    emailAddressParts = emailAddress.split('@');
    emailAddress = [
      emailAddressParts[0],
      option.hash.suffix,
      '@',
      emailAddressParts[1],
    ].join('');
  }
  emailAddress = Ember.Handlebars.Utils.escapeExpression(emailAddress);
  label = (arguments.length == 2) ? emailAddress : Ember.Handlebars.Utils.escapeExpression(label);

  var link = '<a href="mailto:' + emailAddress + '">' + label + '</a>';
  return new Ember.Handlebars.SafeString(link);
});
