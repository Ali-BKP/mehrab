
let http = require('http');
let fs = require('fs');
let insertToFile = require("./insertToFile");
let port = 8081;
let server = http.createServer(requestHandler);

server.listen(port);
console.log("Server is running on port:" + port)

let headers = {
    text: { 'Content-Type': 'Text/Plain' },
    html: { 'Content-Type': 'Text/Html' },
    jpg: { 'Content-Type': 'image/jpeg' }
};

function write(response, badaneh, type){
    response.writeHead(200, headers[type]);
    response.write(badaneh);
    response.end();
}

function funcx(request, response, data) {
    console.log('this is x');
    write(response, 'salam xxxxx New Server', 'text');
    console.log("Data inside x", data.length);

    // response.writeHead(200, headers.text);
    // response.write('salam xxxxx');
    // response.end();

}

function funcy(request, response) {
    console.log('this is y');
    write(response, 'salam yyyyy', 'text')
    // response.writeHead(200, headers.text);
    // response.write('salam yyyyy');
    // response.end();
}

let routes = {
    x: funcx,
    y: funcy,
}

function requestHandler(request, response) {
    let firstPart = request.url.split('/')[1];

    if (firstPart !== 'favicon.ico') {

        console.log('______________________________________________________')
        console.log('method:url', request.method, request.url);
        console.log('splitted  ', request.url.split('/'));
        console.log('firstPart ', firstPart);
        
        let data = "";
        request.on('data', function(chunk){  
            data += chunk;
        });
        request.on('end', function(){
            console.log("Data:   ", data);
            try{
                routes[firstPart](request, response, data);
            }
            catch(error){
                console.log('CATCHED ERROR', error);
                write(response, 'ERROR... ROUTE NOT FOUND.', 'text');
            }
        });               
    }
}




