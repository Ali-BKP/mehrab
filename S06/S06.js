let http = require("http");
let server = http.createServer(requestHandler);
server.listen(80);

let headers = {"Content-Type" : "Text/Plain"};



function requestHandler(request,response)
{
    let currentRoute = request.url.split('/');
    let routes = 
    {
        sayHello : function ()
        {
            response.write("salam"+ " " + request.url + " "+  request.method + '\n');
            response.end();
        },
        "saySomeThing":function()
        {
            response.write("<h1 style=' color:"+ currentRoute[3] +";'>"+ currentRoute[2]+ "</h1>" + '\n');
            response.end();
        },
        "favicon.ico" : function()
        {
            response.write("fav" + '\n');
            response.end();
        }
    }

    
    routes[currentRoute[1]]();
}