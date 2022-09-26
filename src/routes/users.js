const { Router } = require('express');
const { getUsers, updateUser, deleteUser, getUsersByCountry, getYoungUsers, register, login } = require('../controllers/users');
const verifyAdmin = require('../middlewares/verifyAdmin');
const router = Router();
const {check} = require('express-validator');
const validateFields = require('../middlewares/validateFields');
const { checkIfUserExist, checkIfRoleExist } = require('../helpers/customValidations');
const auth = require('../middlewares/auth');

router.get('/', auth, verifyAdmin, getUsers)
router.get('/:country', /*verifyAdmin ,*/ getUsersByCountry)
router.get('/filter/young',(req,res,next)=>{console.log('ruta correcta');next()} ,/*verifyAdmin ,*/ getYoungUsers)
router.post('/', [
  check('name','El nombre es obligatorio y tiene que estar entre 3 y 25 caracteres').not().isEmpty().isLength({min:3, max:25}),
  check('email','Formato inválido de email').isEmail(),
  check('password','Formato inválido de contraseña').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  check('age','Edad no permitida').isFloat({min:0}),
  check('gender','Género no permitido').isIn(['M','F']),
  check('role').custom(checkIfRoleExist),
  validateFields
],register)
router.post('/login',[
  check('email','Formato inválido de email').isEmail(),
  check('password','Contraseña obligatoria').not().isEmpty(),
  validateFields
], login)
router.put('/',[
  check('id').custom(checkIfUserExist),
  validateFields
], updateUser)
router.delete('/',[
  check('id').custom(checkIfUserExist),
  validateFields
], deleteUser)
// http://mi-app.com/4000/users/argentina

module.exports = router;