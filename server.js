var fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();


const PARAMS = {
    host:"127.0.0.1",
    port:8080
};

const rtTab = [
    {name:"/",file:"./index.html"},
    {name:"/about",file:"./about.html"},
    {name:"/comingsoon",file:"./comingsoon.html"},
    {name:"/contact",file:"./contact.html"},
    {name:"/privacy",file:"./privacy.html"},
    {name:"/projects",file:"./projects.html"}
    
]

http.createServer(app).listen(PARAMS);

app.use("/css",express.static("./css"));
app.use("/img",express.static("./img"));
app.use("/js",express.static("./js"));
//app.use("/",express.static("./"));


app.use(function(req, res, next){
    var fileName="./404.html";
    for(var i=0;i<rtTab.length;i++){
        if(rtTab[i].name===req.url){
            fileName = rtTab[i].file;
            break;
        }
    }
    fs.readFile(fileName,function(err,data){

        res.send(data.toString().replace(/index.html/g,"\/").replace(/\.html/g,""));
    });  
});