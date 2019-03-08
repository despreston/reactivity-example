const { pushTarget, popTarget } = require('./dep');

/* Watcher class
 * The 'computed' value. Relies on the values of 1 or more Dep's
 * When a change is made to any of the dependencies, the callback fn is called
 */
class Watcher {
  constructor( getter, cb ) {
    this.getter = getter;
    this.cb     = cb;
    this.value  = this.get();
  }

  get() {
    pushTarget( this );
    const value = this.getter();
    popTarget();
    return value;
  }

  // Add this Watcher to the dep's list of listeners
  addDep( dep ) {
    dep.addSub( this );
  }

  //
  update() {
    const value    = this.get();
    const oldValue = this.value;
    this.value     = value;

    this.cb( value, oldValue );
  }
}

module.exports = Watcher;
