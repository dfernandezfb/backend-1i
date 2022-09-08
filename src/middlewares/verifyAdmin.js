
const verifyAdmin = (req,res,next)=>{
  const admin = false;
  if(admin===true){
    next()
  }else{
    res.status(403).json({message:'Usted no tiene permisos'});
  }
}

module.exports = verifyAdmin;