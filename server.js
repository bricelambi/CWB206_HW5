
var http = require('http');
const { parse } = require('querystring');
var server = http.createServer ( function(request,response){

    var path = request.url.split('/')[1]
    console.log(path);

    if (path == "") {
	if(request.method == "GET")
	{
	    response.writeHead(200, {"Content-Type":"text\plain"});
            response.end("received GET request.")
	}
	else if(request.method == "POST")
	{
	    response.writeHead(200, {"Content-Type":"text\plain"});
            response.end("received POST request.");
	}
	else
	{
	    response.writeHead(404, {"Content-Type":"text\plain"});
            response.end("Undefined request.");
	}
    } else if (path == "test1") {
	if(request.method == "POST")
	{
	    let form_data = "";
	    request.on('data', (chunk) => {
		form_data += chunk.toString();
	    });
	    request.on('end', () => {
		var data = parse(form_data);
		console.log(form_data, data);
		if (!data['email'] || !data['name'] || !data['phone']) {
		    response.writeHead(400);
		    response.end('missing required form fields');
		} else {
		    response.writeHead(200, {"Content-Type":"text\plain"});
		    response.end("received POST request.");
		}
	    });
	}
	else
	{
	    response.writeHead(404, {"Content-Type":"text\plain"});
            response.end("Undefined request.");
	}
    } else if (path == "test2") {
	if(request.method == "GET")
	{
	    response.writeHead(200, {"Content-Type":"text\plain"});
            response.end("{\"token\":\"abc123\"}");
	}
	else
	{
	    response.writeHead(404, {"Content-Type":"text\plain"});
            response.end("Undefined request.");
	}
    } else if (path == "test3") {
	if(request.method == "POST")
	{
	    let form_data = "";
	    request.on('data', (chunk) => {
		form_data += chunk.toString();
	    });
	    request.on('end', () => {
		var data = parse(form_data);
		console.log(form_data, data);
		if (!data['token'] || data['token'] != 'abc123') {
		    response.writeHead(403);
		    response.end('missing token');
		} else {
		    response.writeHead(200, {"Content-Type":"text\plain"});
		    response.end("received POST request.");
		}
	    });
	}
	else
	{
	    response.writeHead(404, {"Content-Type":"text\plain"});
            response.end("Undefined request.");
	}
    }
});

server.listen(8000);
console.log("Server running on port 8000");
