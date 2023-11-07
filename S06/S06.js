let http = require("http");
let server = http.createServer(requestHandler);
server.listen(80);

let headers = {"Content-Type" : "Text/Plain"};

let routes = 
    {
        sayHello : function (request,response,currentRoute)
        {
            response.write("salam"+ " " + request.url + " "+  request.method + '\n');
            response.end();
        },
        "saySomeThing":function(request,response,currentRoute)
        {
            response.write("<h1 style=' color:"+ currentRoute[3] +";'>"+ currentRoute[2]+ "</h1>" + '\n');
            response.end();
        },
        "favicon.ico" : function(request,response,currentRoute)
        {
            response.write("fav" + '\n');
            response.end();
        }
    }

function requestHandler(request,response)
{
    let currentRoute = request.url.split('/');
    
    if(currentRoute[1] != "favicon.ico")
    {
        routes[currentRoute[1]](request,response,currentRoute);
    }
}