const { Router } = require('express');
const { getProducts, addProduct, editProduct, deleteProduct, getProductsByBrand } = require('../controllers/products');
const router = Router();

router.get('/:name?', getProducts);
router.get('/brand/single', getProductsByBrand);
router.post('/', addProduct)
router.put('/', editProduct)
router.delete('/', deleteProduct)
//!ENDPOINTS
// https://localhost:5000/ products / ${name} ? propiedad1 = valor1 & propiedad2 = valor2
// https://localhost:5000/products?brand=rolling&limitPrice=20
// {
//   brand:'rolling',
//   limitPrice:'20'
// }
                  
module.exports = router;