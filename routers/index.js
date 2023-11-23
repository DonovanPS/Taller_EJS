const router = require('express').Router();

const { findAll } = require('../controllers/products');

router.get("/", (req, res) => {
    res.render('index', { title: "Gestión de Productos"});
});




router.get("/product", (req, res) => {
    try {
        // Llamada a la función findAll del controlador
        const productsData = findAll();

       
        // Renderiza la vista 'products' y pasa los datos de productos
        res.render('products', { title: "Productos", data: productsData.data });
    } catch (error) {
        // Manejo de errores, por ejemplo, redirigir a una página de error
        res.render('error', { title: "Error", error: "Error al obtener datos de productos" });
    }
});




module.exports = router;