const router = require('express').Router();

const { findAll, save } = require('../controllers/products');

router.get("/", (req, res) => {
    res.render('index', { title: "Gestión de Productos"});
});




router.get("/product", (req, res) => {
    try {
        
        const productsData = findAll();

       
        
        res.render('products', { title: "Productos", data: productsData.data });
    } catch (error) {
        // Manejo de errores, por ejemplo, redirigir a una página de error
        res.render('error', { title: "Error", error: "Error al obtener datos de productos" });
    }
});


router.get("/products", (req, res) => {
    try {
        const productsData = findAll();
        res.render('templates/table', { layout: false, data: productsData.data });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos de productos" });
    }
});



router.post("/product", (req, res) => {
    try {
        
        const productsData = req.body;

        // Validar la data antes de llamar a la función save
        const validationResult = isValidProduct(productsData);

        if (validationResult.isValid) {
            const saveResult = save(productsData);

            if (saveResult.state === "true") {
                res.render('products', { title: "Productos", data: saveResult.data });
            } else {
                res.render('error', { title: "Error", error: saveResult.error });
            }
        } else {
            console.log(validationResult.error);
            //res.render('error', { title: "Error de validación", error: validationResult.error });
        }
    } catch (error) {
        // Manejo de errores, por ejemplo, redirigir a una página de error
        res.render('error', { title: "Error", error: "Error al obtener datos de productos" });
    }
});




const isValidProduct = (product) => {
    const requiredFields = ["Nombre", "Cantidad", "Precio", "Descripcion", "Categoria"];

    for (const field of requiredFields) {
        if (!(field in product)) {
            return { isValid: false, error: `Campo requerido "${field}" no presente.` };
        }
    }

    return { isValid: true };
};

module.exports = router;