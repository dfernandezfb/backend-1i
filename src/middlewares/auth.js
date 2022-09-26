const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{
  try {
    const token= req.header('authorization') //x-auth-token authorization bearer-token;
    if(!token) throw new Error('Credenciales inválidas');
    const { id }= jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(id);
    if(!id) throw new Error('Credenciales inválidas');
    req.id = id;
    next()
  } catch (error) {
    res.status(401).json({error:error.message})
  }
}

module.exports = auth;
//MENSAJES HTTP

// method
// headers
// body