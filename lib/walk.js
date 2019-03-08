const { Dep } = require('./dep');

// Create getters and setters for all fields of an object
function walk( obj ) {
  Object.entries( obj ).forEach( ( [ key, val ] ) => {
    defineReactive( key, val, obj );
  });
}

// Recursively add getter's and setter's to each property in the object
function defineReactive( key, val, obj ) {

  // If this field is an object (perhaps a nested object?) keep going down the
  // recursive rabbit hole
  if ( val !== null && typeof val === 'object' ) {
    walk( val );
  }

  // each variable in the expression gets turned into a Dep
  const dep = new Dep();

  Object.defineProperty( obj, key, {
    enumerable: true,
    configurable: true,
    get() {

      // If im a Watcher and I'm trying to access this, it means I depend on it
      dep.depend();

      return val;
    },
    set( newVal ) {
      val = newVal;

      // Notify all of the watchers that depend on this variable
      dep.notify();
    }
  });
}

module.exports = walk;
