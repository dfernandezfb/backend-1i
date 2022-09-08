const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  name:{
    type:String,
    lowercase:true,
    trim:true,
    minLength:[3, 'La cantidad mínima de caracteres es 3'],
    maxLength:[25, 'La cantidad máxima de caracteres es 25']
  },
  email:{
    type:String,
    required: [true,'El campo de email es obligatorio'],
    unique: [true, 'El email ya ha sido registrado'],
    uppercase:true,
  },
  password:{
    type:String,
    match:[/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'La contraseña no tiene el formato adecuado']
  },
  age:{
    type:Number,
    min:0,
    max:120
  },
  birth:{
    type:Date
  },
  gender:{
    type:String,
    enum:['M','F']
  },
  admin:{
    type:Boolean,
    default: false,
    select:false
  },
  hobbies:{
    type:[String]
  }
},{
  versionKey:false,
  timestamps:true
})

UserSchema.methods.toJSON= function(){
  const {password, /*_id,*/ ...user} = this.toObject();
  // user.id=_id;
  return user
}

module.exports = model('User',UserSchema);