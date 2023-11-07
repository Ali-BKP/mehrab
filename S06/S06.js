let http = require("http");
let server = http.createServer(requestHandler);
server.listen(80);

let headers = {"Content-Type" : "Text/Plain"};

function requestHandler(request,response)
{

    response.writeHead(200,headers);
    response.write("salam"+ " " + request.url + " "+  request.method);
    response.end();
}