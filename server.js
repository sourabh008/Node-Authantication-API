const http=require("http");
const app=require("./app")
var server=http.createServer(app)
server.listen(3000,(req,res)=>{
    console.log("server working")
})