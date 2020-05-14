var fs = require('fs');
var event = require('events');

const siEmitter = new event.EventEmitter();

fs.readFile('input.txt', function(err, data) {
    if (err){
        console.log(err);
    }

    setTimeout(() => {
        console.log("Wait for 2 second to print : " + data.toString());
        siEmitter.emit('readFileCalled');
    }, 2000);
} );

console.log('this will be printed first')

// listening for the event 'readFileCalled'
siEmitter.on('readFileCalled', () => {
    console.log('Read event occured');
});