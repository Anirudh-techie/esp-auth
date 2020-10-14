# esp-auth
It is an awesome light-weight auth middleware for express. it uses BASIC http authentication.

# API
Params: users, unauthorizedhtml, realm

users: Array of objects with value: username, password, data
Unauthorizedhtml: HTML string to send to Unauthorized client
realm: realm value for HTTP header

The data property in the user object will  be added to req.authData


# Example
```javascript
var espAuth = require("esp-auth");
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

app.use(espAuth(users,unauthhtml,realm));

app.get("/",(req,res)=>{
   res.send(`<h1>Hello ${req.user}</h1><h2>You are a ${req.authData.role}</h2>`)
})
```