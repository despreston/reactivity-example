/* The Dep class ('Dependency')
 * Every variable in an expression (e.g a+b) gets wrapped in a Dep instance
 */
class Dep {
  constructor() {
    // Callbacks to run when the value of this Dep is changed
    this.subs = new Set();
  }

  addSub( sub ) {
    this.subs.add( sub );
  }

  // If theres a listening Watcher, tell them to add this Dep as a dependency
  depend() {
    if ( Dep.target ) {
      Dep.target.addDep( this );
    }
  }

  // announce to all Watchers that there was a change in the value of this Dep
  notify() {
    this.subs.forEach( sub => sub.update() );
  }
}

/*  1. Global b/c we can only deal with 1 Watcher at a time.
 *
 *  2. If non-null => a Watcher expression is being run
 *
 *  3. We'll run the Watcher's expression, then track which dependencies get
 *     accessed during the execution. Then we'll add this Watcher to that
 *     Dep's list of listeners.
 */
Dep.target = null;
const targetStack = [];

// Mark a Watcher (target) as the one who's expression is being run
function pushTarget( target ) {
  if ( Dep.target ) {
    targetStack.push( target );
  }
  Dep.target = target;
}

// Done with the Watcher's expression
function popTarget() {
  Dep.target = targetStack.pop();
}

module.exports = {
  pushTarget,
  popTarget,
  Dep
};
