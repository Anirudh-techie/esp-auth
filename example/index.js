var app = require("express")();

var httpAuth = require("../");
var users = [
{       
   username:"admin",
   password:"password",
   data:{
      role:"admin",
      id:"1234567890"
   }
},
{
   username:"viewer",
   password:"viewer_pwd_12345",
   data:{
      role:"viewer",
      id:"0987654321"
   }
}
]
// or store these in JSON file then do : require('file/to/users.json');

var realm = "Awesome app";

var unauthhtml = "<h1>Login!!</h1> <h6>You have requested a page without authorization</h6>"

app.use(httpAuth(users,unauthhtml,realm));

app.get("/",(req,res)=>{
   res.send(`<h1>Hello ${req.user}</h1><h2>You are a ${req.authData.role}</h2>`)
})
app.listen(3000,()=>{
   console.log("app listening in port 3000")
});