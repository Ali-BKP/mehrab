let server = require("http");
let fs = require("fs");

const port = 8080;

server.createServer(main).listen(port, () => {
    console.log("server started on port: " + port);
});

let routes =
{
    index: index,
    open_file: openFile,
    write_file: writeFile,
    write_fileJson: writeFileJson
}

let headers =
{
    text: { "Content-Type": "text/plain" },
    html: { "Content-Type": "text/html" }
}

function openFile(response, fileName, contentType) {
    fs.readFile(fileName, function (err, data) {
        if (err) {
            throw err;
        }
        else {
            fsHandler(response, contentType, data);
        }
    });
}

function writeFile(response, fileName, input) {

    // fs.readFile("message.txt", funciton(error, fileData))
    // {
    //     if (error) {
    //         write(response, "FILE NOT FOUND.", "text")
    //     }
    //     else {
    //         fileData = JSON.parse(fileName);
    //         fileData.data.input(JSON.parse(input));
    //         fileData = JSON.stringify(fileData);
    //     }
    // }

}

function writeFileJson(response, fileName, input) 
{
    fs.readFile("message.txt", funciton(error, fileData))
    {
        if (error) {
            write(response, "FILE NOT FOUND.", "text");
        }
        else {
            fileData = JSON.parse(fileName);
            fileData.input.push(JSON.parse(input));
            fileData = JSON.stringify(fileData);

            fs.writeFile(fileName , fileData , "utf8" , function(error)
            {
                if(error)
                {
                    write(response, "FS ERROR.", "text");
                }
                else
                {
                    write(response, "Data Saved", "text");

                }
            });
        }
    }

}

function index(response) {
    fs.readFile("index.html", function (err, data) {
        if (err) {
            response.write("page not found :(");
            response.end();
        }
        else {
            fsHandler(response, headers.html, data);
        }
    })
}

function fsHandler(response, contentType, data) {
    response.writeHead(200, headers[contentType]);
    response.write(data);
    response.end();
}

function main(request, response) {
    const route = request.url.split('/');
    const root = (route[1]).toLowerCase();

    
    let data = "";
    request.on("data", function (chunk) {
        data += chunk;
    });

    request.on("end", function () {
        console.log(data)
        switch (root) 
        {
            case "index":
                routes["index"](response);
                break;
            case "open_file":
                routes["open_file"](response, route[2], route[3]);
                break;

            case "write_file":
                routes["write_file"](response, route[2], route[3]);
                break;
            case "write_fileJson":
                routes["write_fileJson"](response, route[2], data);
                break;

            default:
                response.write("page not found :(");
                response.end();
                break;
        }
    });


}
