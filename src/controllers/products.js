const CustomError = require("../helpers/CustomError");


const getProductsByBrand = (req,res)=>{
  try {
    if(!req.query.brand) throw new CustomError('You need to write a brand',404);
    res.status(200).json({
      message:'Take your damn product of the brand ' + req.query.brand
    })
  } catch (error) {
    res.status(error.code || 500).json({message:error.message})
  }
}
// // const getProductsByBrand = (req,res)=>{
// //   try {
// //     if(!req.query.brand) throw Error('You need to write a brand');
// //       res.status(200).json({
// //       message:'Take your damn product of the brand ' + req.query.brand
// //     })
// //   } catch (error) {
// //     res.status(400).json({message:error.message})
// //   }
// // }
// const getProductsByBrand = (req,res)=>{
//   try {
//     console.log(req.query);
//     if(!req.query.brand) return res.status(400).json({ message:'You need to write a brand'})
//       res.status(200).json({
//       message:'Take your damn product of the brand ' + req.query.brand
//     })
//   } catch (error) {
  
//   }
// }
const getProducts = (req,res)=>{
  if(!req.params.name){
    res.status(200).json({
      message:'All products'
    })
  }else{
    res.status(200).json({
      message:'Take your damn product ' + req.params.name
    })
  }
}
// const getProducts = (req,res)=>{
//   if(!req.body.name){
//     res.status(200).json({
//       message:'All products'
//     })
//   }else{
//     res.status(200).json({
//       message:'Take your damn product ' + req.body.name
//     })
//   }
// }

const addProduct = (req,res) =>{
  res.status(201).json({
    message:'The product has been added'
  })
}
const editProduct = (req,res) =>{
  res.status(201).json({
    message:'The product has been updated'
  })
}
const deleteProduct = (req,res) =>{
  res.status(201).json({
    message:'The product has been deleted'
  })
}

module.exports = {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getProductsByBrand
}