const Role = require("../models/Role");
const User = require("../models/User");

const verifyAdmin = async (req,res,next)=>{
  try {
    const id = req.id;
    const user = await User.findById(id);
    const role = await Role.findOne({name:'ADMIN'});
    if(user.role.toString() == role._id.toString()){
      next()
    }else{
      throw new Error ('Usted no tiene permisos')
    }
  } catch (error) {
    res.status(403).json({message:error.message});
  }
}

module.exports = verifyAdmin;