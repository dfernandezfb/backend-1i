const { Router } = require('express');
const { getUsers, addUser, updateUser, deleteUser, getUsersByCountry, getYoungUsers } = require('../controllers/users');
const verifyAdmin = require('../middlewares/verifyAdmin');
const router = Router();

router.get('/', /*verifyAdmin ,*/ getUsers)
router.get('/:country', /*verifyAdmin ,*/ getUsersByCountry)
router.get('/filter/young',(req,res,next)=>{console.log('ruta correcta');next()} ,/*verifyAdmin ,*/ getYoungUsers)
router.post('/', addUser)
router.put('/', updateUser)
router.delete('/', deleteUser)
// http://mi-app.com/4000/users/argentina

module.exports = router;