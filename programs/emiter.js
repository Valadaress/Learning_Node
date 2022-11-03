const EventEmitter = require('events')
const emitter = new EventEmitter()

// Register a listener
emitter.on('firstEvent', function() { console.log('Worked') })

// Raise an event
emitter.emit('firstEvent')