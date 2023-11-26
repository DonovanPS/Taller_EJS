const router = require('express').Router();

const { findAll, save, update, deleteID } = require('../controllers/sales');

router.get("/", (req, res) => {
    res.render('sales', {title: "Ventas"});
});





module.exports = router;