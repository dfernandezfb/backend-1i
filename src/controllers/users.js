const CustomError = require('../helpers/CustomError');
const User = require('./../models/User');

// const getUsers = (req,res)=>{
//   console.log(req.body); //! LAS PETICIONES DE TIPO GET NO TIENEN BODY
//   res.status(200).json({users:[]});
// }
const getUsers = async(req,res)=>{
  const users = await User.find();
  const user = await User.findById('63169093986ec14383877791');
  const user2 = await User.findOne({name:'Tomas'});
  res.status(200).json({
    users,
    user,
    user2
  })
}
const getUsersByCountry = (req,res)=>{
  res.status(200).json({users:'Usuarios de ' + req.params.country});
}

const getYoungUsers = async(req,res)=>{
  try {
    // const users = await User.find();
    // const youngUsers = users.filter(user=>user.age<25)
    // res.status(200).json({users:youngUsers})
    //? 73ms
    const usersLTE = await User.find({age:{$lte:25}})
    const usersLT = await User.find({age:{$lt:25}})
    const usersGTE = await User.find({age:{$gte:25}})
    const usersGT = await User.find({age:{$gt:25}})
    res.status(200).json({usersLT, usersGT})
    //? 63ms
  } catch (error) {
    res.status(error.code || 500).json({message:error.message})
  }
}

// const addUser = (req,res)=>{
//   console.log(req.body);
//   // const user = {
//   //   name:req.body.name,
//   //   country: req.body.country
//   // }
//   const user = req.body;
//   // res.status(201).json({userCreated:user});
//   res.status(201).json({user});
// }

const addUser = async(req,res)=>{
  try {
    const newUser = new User(req.body);
    const userSaved = await newUser.save();
    if(!userSaved) throw new CustomError('Falla al crear usuario',400);
    res.status(201).json({userSaved})
  } catch (error) {
    res.status(error.code || 500).json({error:error.message});
  }
}

const updateUser = (req,res)=>{
  res.status(200).json({message:'Se ha actualizado un usuario'});
}

const deleteUser = (req,res)=>{
  res.status(200).json({message:'Se ha borrado un usuario'});
}

module.exports = {
  getUsers,
  getUsersByCountry,
  addUser,
  updateUser,
  deleteUser,
  getYoungUsers
}