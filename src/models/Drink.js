const {model, Schema} = require('mongoose');

const DrinkSchema = new Schema({
  name:{
    type:String,
    required:[true,'El campo de nombre es obligatorio'],
    trim:true
  },
  brand:{
    type:String,
    required:[true,'El campo de marca es obligatorio'],
    trim:true
  },
  price:{
    type:Number,
    min:[0,'No puede ser número negativo'],
    required:true
  },
  offer:{
    type:Boolean,
    default:false
  },
  owner:{
    type: Schema.ObjectId,
    ref:'User'
  }
},{
  versionKey:false,
  timestamps:true
})

module.exports = model('Drink',DrinkSchema);