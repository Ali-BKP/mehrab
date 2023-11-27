let server = require("http");
let fs = require("fs");

const port = 8080;

server.createServer(main).listen(port , ()=>
{
    console.log("server started on port: " + port);
});

let routes = 
{
    index:index,
    openFile:openFile
}

let headers = 
{
    text: {"Content-Type" : "text/plain"},
    html: {"Content-Type" : "text/html"}
}

function openFile (response,fileName,contentType)
{
    fs.readFile(fileName,function(err,data)
    {
        if(err)
        {
            throw err;
        }
        else
        {
            fsHandler(response,contentType , data);
        }
    });
}

function index (response)
{
    fs.readFile("index.html" , function(err,data)
    {
        if (err) 
        {
            response.write("page not found :(");
            response.end();        
        }
        else
        {
            fsHandler(response,headers.html ,data);
        }
    })
}

function fsHandler (response,contentType,data)
{
    response.writeHead(200 , headers[contentType]);
    response.write(data);
    response.end();        
}

function main (request,response)
{
    const route = request.url.split('/');
    

    switch(route[1])
    {
        case "index":
            routes["index"](response);
            break;
        case "openFile":
            routes["openFile"](response,route[2],route[3]);
            break;
        default:
            response.write("page not found :(");
            response.end();
            break;
    }
}
