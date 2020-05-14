var fs = require('fs');

var data = fs.readFile('input.txt', function(err, data) {
    if (err){
        console.log(err);
    }

    setTimeout(() => {
        console.log("Wait for 2 second to print : " + data.toString())
    }, 2000);
} );

console.log('this will be printed first')