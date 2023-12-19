const fs = require("fs");

let headers = 
{
    text: { 'Content-Type': 'Text/Plain' },
    html: { 'Content-Type': 'Text/Html' },
    jpg: { 'Content-Type': 'image/jpeg' }
};

function write(response, badaneh, type){
    response.writeHead(200, headers[type]);
    response.write(badaneh);
    response.end();
}

function insertToFileC(request, response, data){
    console.log("inside insertToFile", data);

    fs.readFile('message.txt', function (error, fileData) {
        if(error){
            write(response, 'FILE NOT FOUND.', 'text');
        }
        else{

            fileData = JSON.parse(fileData);
            fileData.data.push(JSON.parse(data));
            fileData = JSON.stringify(fileData);

            fs.writeFile('message.txt', fileData, 'utf8', function(error) {
                if(error){
                    write(response, 'FS ERROR.', 'text');
                }
                else{
                    write(response, "Data Saved.", 'text'); 
                }
            }); 
        }
    });
}

exports.insertToFile = insertToFileC;