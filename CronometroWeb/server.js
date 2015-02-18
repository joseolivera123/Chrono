var http = require("http");
var url = require("url");
var fs = require("fs");

function crono(obj) {
  contador_s = 0;
  contador_m = 0;
  //s = obj.getElementById("segundos");
  //m = obj.getElementById("minutos");

  window.setInterval(
    function() {
      if (contador_s == 60) {
        console.log(contador_s);
        contador_s = 0;
        contador_m++;
        //m.innerHTML = contador_m;
        if (contador_m == 60) {
          contador_m = 0;
        }
      }
      //s.innerHTML = contador_s;
      contador_s++;
    }, 1000);
}

function start(route, beg) {
  function onRequest(request, response) {
    fs.readFile("index.html",function(err,data){
      var pathname = url.parse(request.url).pathname;
      console.log("Request for " + pathname + " received.");

      route(pathname);

      response.writeHead(200, {
        "Content-Type": "text/html","Content-Length":data.length
      });
      
      var objeto_html;// = document.documentElement;
      crono(objeto_html);
      response.write(data);
      response.end();
    });
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;