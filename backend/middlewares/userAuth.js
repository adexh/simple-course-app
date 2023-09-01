const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET;

const auth = (req,res,next)=>{
  if(req.cookies.jwt===undefined)
      return res.sendStatus(401);
  let token = req.cookies.jwt;
  jwt.verify(token,SECRET,(err,user)=>{
  if(err){
      return res.sendStatus(403);
  }
  if(user){
      req.user = user;
      next();
  }
  });
}

module.exports = auth;