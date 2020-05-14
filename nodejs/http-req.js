var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (request, response){
    var pathname = url.parse(request.url).pathname;

    console.log('Requset for ' + pathname + ' received');

    fs.readFile(pathname.substr(1),  function(err, data) {
        if (err){
            console.log(err);
            response.writeHead(404, {'COntent-Type': 'text/html'});
        }else{
            response.writeHead(200, {'COntent-Type': 'text/html'});
            response.write(data.toString());
        }
        setTimeout(() => {
            console.log("Wait for 2 second to print : " + data.toString())
        }, 2000);
        response.end();
    } );

}).listen(3000);

console.log('server running at localhost:3000')