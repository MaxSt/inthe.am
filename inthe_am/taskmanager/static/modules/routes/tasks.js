var route = Ember.Route.extend({
  model: function(){
    return this.store.find('task');
  },
  afterModel: function(tasks, transition) {
    if (tasks.get('length') === 0) {
      this.transitionTo('getting_started');
    } else {
      this.transitionTo('task', tasks.get('firstObject'));
    }
  }
});

module.exports = route;
