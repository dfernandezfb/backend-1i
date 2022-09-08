const mongoose = require('mongoose');

const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.DB_URI_ATLAS);
    console.log('Base de datos conectada');
  } catch (error) { 
    console.log(error);
  }
}

module.exports = connectDB;