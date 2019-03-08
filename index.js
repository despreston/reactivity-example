const Watcher = require('./lib/watcher');
const walk    = require('./lib/walk');

// initial state
const user = { first: 'Kenny', last: 'Fellows' };

// setup the state with getters and setters
walk( user );

const callback = ( newVal, oldVal ) => {
  console.log( 'Old: %s, New: %s', oldVal, newVal );
};

// create a watcher w/ an expression and a callback
new Watcher( () => user.first, callback );

// change the state
user.first = 'Des';
user.last = 'Preston';


/*****************************************************/


// Pretty example
function DesVue() {
  return {
    computed: {
      fullName() {
        return `${ user.first } ${ user.last }`;
      }
    }
  }
}

const component = DesVue();

// Turn each 'computed' property into a Watcher
Object.entries( component.computed ).forEach( ( [ key, val ] ) => {
  new Watcher( val, () => console.log( `${ key }: ${ val() }` ) );
});


// 🎉 🎉 🎉
user.first = 'Don';
