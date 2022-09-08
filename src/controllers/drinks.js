const Drink = require("../models/Drink");

const addDrink = async (req,res)=>{
  try {
    const newDrink = new Drink(req.body);
    await newDrink.save();
    res.status(201).json({message:'La bebida ha sido guardada'})
  } catch (error) {
    res.status(error.code || 500).json({message:error.message})
  }
}

const getDrinks = async (req,res)=>{
  try {
    // const { page } = req.query;
    // const drinksCount = await Drink.countDocuments();
    // const drinks = await Drink.find().skip(page*5).limit(5);
    // //? 147ms

    const { page } = req.query;
    const [ drinksCount, drinks ] = await Promise.all([
      Drink.countDocuments(),
      Drink.find().skip(page*5).limit(5).populate('owner','name email -_id')
    ])
    //? 85ms

    res.status(200).json({drinksCount,page,drinks})
  } catch (error) {
    res.status(error.code || 500).json({message:error.message})
  }
}

const getDrinksCheaper = async (req,res)=>{
  try {
    const {limit} = req.query
    const drinks = await Drink.find({price:{$lte:limit}});
    res.status(200).json({drinks})
  } catch (error) {
    res.status(error.code || 500).json({message:error.message})
  }
}
const getCheaperDrinksOrOffers = async (req,res)=>{
  try {
    const {limit} = req.query
    const drinks = await Drink.find({$or:[{offer:true},{price:{$lte:limit}}]});
    res.status(200).json({drinks})
  } catch (error) {
    res.status(error.code || 500).json({message:error.message})
  }
}

const autocomplete = async (req,res) =>{
  try {
    const { q } =req.query;
    const drinks = await Drink.find({name:{$regex:q, $options:'i'}}).select('-_id -offer -createdAt -updatedAt');
    offer
    res.status(200).json({drinks})
  } catch (error) {
    res.status(error.code || 500).json({message:error.message})
  }
}



module.exports= {
  addDrink,
  getDrinks,
  getDrinksCheaper,
  getCheaperDrinksOrOffers,
  autocomplete
}