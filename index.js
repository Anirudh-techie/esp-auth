/**
 * Basic http auth middleware for express application
 * @param  users Array of user objects with username and password properties. add in the Optional 'data' property which gets add to req.data
 * @param  realm Value for HTTP Realm
 * @param UnauthorizedHTML HTML string to send back for non authorized users
 * @returns Auth Middleware for Express App
 * @example var espAuth = require("esp-auth");
 * var users = [
 *    {
 *       username:"admin",
 *       password:"password",
 *       data:{
 *          role:"admin",
 *          id:"1234567890"
 *       }
 *    },
 *    {
 *       username:"viewer",
 *       password:"viewer_pwd_12345",
 *       data:{
 *          role:"viewer",
 *          id:"0987654321"
 *       }
 *    }
 * ]
 * // or store these in JSON file then do : require('file/to/users.json');
 * 
 * var realm = "Awesome app";
 * 
 * var unauthhtml = "<h1>Login!!</h1> <h6>You have requested a page without authorization</h6>"
 * 
 * app.use(espAuth(users,unauthhtml,realm));
 * app.get("/",(req,res)=>{
 *    res.send(`<h1>Hello ${req.user}</h1>`)
 * })
 */
module.exports = (users=[{username,password,data}],UnauthorizedHTML="<h1>Unauthorized!!</h1> Please Login",realm="auth-app")=>{
   return (req,res, next)=>{       
      if(req.headers.authorization){
         var input = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
         var username = input.split(":")[0];
         var password= input.split(":")[1];
         var user = users.find((cred)=>{
            var inputCred = {username:username,password:password};
            return cred.username == inputCred.username && cred.password == inputCred.password
         })
         if(user){
            req.authData = user.data
            req.user = user.username;
            next();
         }else{
            res.set("WWW-Authenticate",`Basic realm="${realm}"`);
            res.status(401).send(UnauthorizedHTML)
         }
      }else{
         res.set("WWW-Authenticate",`Basic realm="${realm}"`);
         res.status(401).send(UnauthorizedHTML)
      }      
   }
}