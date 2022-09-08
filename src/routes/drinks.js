const { Router } = require('express');
const { addDrink, getDrinks, getDrinksCheaper, getCheaperDrinksOrOffers, autocomplete } = require('../controllers/drinks');
const router = Router();

router.post('/', addDrink);
router.get('/', getDrinks);
router.get('/search', autocomplete);
router.get('/cheap', getDrinksCheaper);
router.get('/cheap-offer', getCheaperDrinksOrOffers);

module.exports = router;