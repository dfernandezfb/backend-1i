const Role = require("../models/Role");

const createRoles = async()=>{
  try {
    const count = await Role.countDocuments();
    if(count>0) return;
    await Promise.all([
      new Role({name:'USER'}).save(),
      new Role({name:'ADMIN'}).save()
    ])
  } catch (error) {
    console.log(error);
  }
}

module.exports = createRoles;