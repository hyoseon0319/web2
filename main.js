const querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML (title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
  </body>
  </html>
  `;
}

function templateList(fileList) {
  var list = '<ul>';
  var i = 0;
  while (i < fileList.length) {
    list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`
    i = i + 1;
  }
  list = list+'</ul>';
  return list;
}

var app = http.createServer(function(request,response){ // 서버 만드는 메소드
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(pathname);
    if(pathname === '/'){
      if(queryData.id === undefined) {
        fs.readdir('./data', (err, fileList) => {
          console.log(fileList);
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = templateList(fileList);
           // var list = `
          //   <ul>
          //     <li><a href="/?id=HTML">HTML</a></li>
          //     <li><a href="/?id=CSS">CSS</a></li>
          //     <li><a href="/?id=JavaScript">JavaScript</a></li>
          //   </ul>
          // `
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        })    
  } else {
    fs.readdir('./data', (err, fileList) => {
      fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
        var title = queryData.id;
        var list = templateList(fileList);
        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template);
      });
     });
    }
  } else if (pathname === '/create') {
    fs.readdir('./data', (err, fileList) => {
        var title = 'WEB - create';
        var list = templateList(fileList);
        var template = templateHTML(title, list, 
        `<form action="http://localhost:3000/create_process" method="POST">
          <p>
            <input type="text" name="title" placeholder="title">
          </p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`);
        response.writeHead(200);
        response.end(template);
    });
  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function(data) { // 요청에 데이터가 있으면
      body  = body + data;
    });
    request.on('end', function() { // 요청의 데이터가 모두 받아졌으면
      var post = querystring.parse(body);
      console.log(post);
      var title = post.title;
      var description = post.description;
      console.log('title : ',title)
      console.log('description : ',description)
      fs.writeFile(`data/${title}`, description, 'utf8', 
      function (err) {
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();            
      })
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
}); 
app.listen(3000);