const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET;

const auth = (req,res,next)=>{
  if(req.headers.authorization===undefined)
      return res.sendStatus(401);
  let token = req.headers.authorization?req.headers.authorization.split(' ')[1]:"";
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