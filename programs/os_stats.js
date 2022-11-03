const os = require('os')
let gkm = require('gkm');

var stat = true



// Listen to all mouse events (click, pressed, released, moved, dragged)
// // gkm.events.on('mouse.*', function(data) {
// //     console.log(this.event + ' ' + data);
// //     p
// // });

// Listen to all key events (pressed, released, typed)
gkm.events.on('key.*', function(data) {
    var letter = data[0]
    switch (letter) {
        case 'P':
            stat = false
            console.log('P has been pressed and stoped the process');
            break;
        case 'O':
            stat = true
            console.log('O has been pressed and resume the process');
            break
    }
    // //console.log(this.event + ' ' + data);
});

setInterval(
    function() {
        if (stat) {
            var totalMemory = os.totalmem()
            var freeMemory = os.freemem()

            console.clear()
            console.log(`Total memory is: ${totalMemory / 1000000} MB`)
            console.log(`The Free memory is: ${freeMemory / 1000000} MB`)
        }
    }, 1000)