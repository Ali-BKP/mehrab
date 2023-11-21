let server = require("http");
let fs = require("fs");


server.createServer(main).listen(8080);

let routes = 
{
    index:index
}

let headers = 
{
    text: {"Content-Type" : "text/plain"},
    html: {"Content-Type" : "text/html"}
}

function index (response)
{
    fs.readFile("index.html" , function(err,data)
    {
        if (err) 
        {
            throw err;            
        }
        else
        {
            response.writeHead(200 , headers.html);
            response.write(data);
            console.log("readfile was successful");
            response.end();    
        }
    })
}

function main (request,response)
{
    let route = request.url.split('/')[1];

    switch(route)
    {
        case "index":
            routes["index"](response);
            break;
    }
}
