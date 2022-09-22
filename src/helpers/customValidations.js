const Role = require("../models/Role");
const User = require("../models/User");

const checkIfUserExist = async (id)=>{
  if(!id) throw new Error('id es necesario');
  const user = await User.findById(id);
  if(!user) throw new Error('No existe el usuario solicitado');
}

const checkIfRoleExist = async (roleName)=>{
  const role = await Role.findOne({name:roleName});
  if(!role) throw new Error('No existe rol especificado');
}

module.exports = {
  checkIfUserExist,
  checkIfRoleExist
}