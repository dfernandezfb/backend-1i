const CustomError = require('../helpers/CustomError');
const Drink = require('../models/Drink');
const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { findById } = require('../models/Drink');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken')

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

const getUser = async(req,res)=>{
  try {
    const {id} =req.query;
    const user = findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.code || 500).json(error.message)
  }
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

// const addUser = async(req,res)=>{
//   try {
//     const newUser = new User(req.body);
//     const userSaved = await newUser.save();
//     if(!userSaved) throw new CustomError('Falla al crear usuario',400);
//     res.status(201).json({userSaved})
//   } catch (error) {
//     res.status(error.code || 500).json({error:error.message});
//   }
// }

const register = async ( req, res)=>{
  try {
    const { password, ...user } = req.body;
    const role = await Role.findOne({name:'USER'});
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted= await bcrypt.hash(password, salt);
    const newUser = new User({
      ...user,
      password:passwordEncrypted,
      role:role._id
    });
    await newUser.save();
    res.status(201).json({message:'Usuario registrado'});
  } catch (error) {
    res.status(error.code || 500).json({error:error.message});
  }
}

const updateUser = (req,res)=>{
  res.status(200).json({message:'Se ha actualizado un usuario'});
}

const deleteUser = async (req,res)=>{
  try {
    const {idUser, idUserToBeDead} = req.body;
    const user = await User.findById(idUser);
    const role = await Role.findById(user.role);
    if(!role) throw new CustomError('No existe rol especificado',404);
    if(role.name ==='ADMIN'){
      await User.findByIdAndDelete(id);
      // const drinksToModify = await Drink.find({owner:id}); //* Busco todos las drinks que tienen al user como owner y los modifico
      res.status(200).json({message:"El usuario ha sido eliminado"});
    }
  } catch (error) {
    res.status(error.code || 500).json({message:error.message});
  }
}

const login = async(req,res)=>{
  try {
    // CONTROL DE USUARIO Y CONTRASEÑA
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) throw new CustomError('Usuario no encontrado',404)
    const isOk = await bcrypt.compare(password,user.password); // boolean
    if(!isOk) throw new CustomError('Credenciales inválidas', 401);
    
    //!GENERAR EL TOKEN

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});

    res.status(200).json({message:'logueo correcto',token});
  } catch (error) {
    res.status(error.code || 500).json({message:error.message});
  }
}

//! DRY

module.exports = {
  getUsers,
  getUsersByCountry,
  updateUser,
  deleteUser,
  getYoungUsers,
  register,
  login,
  getUser
}


