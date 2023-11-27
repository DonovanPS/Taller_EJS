const router = require('express').Router();

const { findAll, save, update, deleteID } = require('../controllers/products');

router.get("/", (req, res) => {
    res.render('index', { title: "Nala Beauty Distributions"});
});





module.exports = router;