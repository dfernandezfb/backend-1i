const { Router } = require('express');
const { addDrink, getDrinks, getDrinksCheaper, getCheaperDrinksOrOffers, autocomplete, editDrink, deleteDrink } = require('../controllers/drinks');
const router = Router();

router.post('/', addDrink);
router.get('/', getDrinks);
router.get('/search', autocomplete);
router.get('/cheap', getDrinksCheaper);
router.get('/cheap-offer', getCheaperDrinksOrOffers);
router.put('/', editDrink);
router.delete('/', deleteDrink);

module.exports = router;