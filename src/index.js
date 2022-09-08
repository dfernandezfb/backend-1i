const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const users = require('./routes/users');
const products = require('./routes/products');
const drinks = require('./routes/drinks');
const connectDB = require('./db/db');
dotenv.config();
connectDB();
const app= express();
const PORT = /*process.env.PORT ||*/ 4000;
// app.use(express.static(__dirname + '../public'))
app.use(morgan('dev'))
app.use(express.json()) //nuestro backend entienda peticiones en json
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.get('/ofertas',(req,res)=>{
  res.status(200).json({ofertas:[]});
})
// app.get('*',(req,res)=>{
  // // res.status(404).sendFile(__dirname+'../public/error404.html')
// })

app.use('/users',users)
app.use('/products', products)
app.use('/drinks', drinks)

app.listen(PORT,()=>console.log(`Aplicación escuchando en el puerto ${PORT}...`));
//! http://tu-aplicacion.com:4000/

// PEDIDOS HTTP:
// METHOD: GET
// HEAD: 
// BODY: 