const router = require('express').Router();

const path = require('path');

router.get("/", (req, res) => {
    res.render('index', { title: "Gestión de Productos"});
});

router.get("/product", (req, res) => {
    res.render('productos', { title: "Productos" });
});

router.get("/insertProduct", (req, res) => {
    res.render('formProduct', { title: "Agregar Productos" });
});




module.exports = router;