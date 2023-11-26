const router = require('express').Router();

const { findAll, save, update, deleteID } = require('../controllers/products');

router.get("/", (req, res) => {
    res.render('index', { title: "Nala Beauty Distributions"});
});




router.get("/product", (req, res) => {
    try {
        
        const productsData = findAll();

        
        res.render('products', { title: "Productos", data: productsData.data });
    } catch (error) {
       
        res.render('error', { title: "Error", error: "Error al obtener datos de productos" });
    }
});



router.get("/product/form", (req, res) => {
    res.render('formProduct', { title: "Formulario de Ventas"});
});



router.post("/product", (req, res) => {
    try {
        
        const productsData = req.body;

        const validationResult = isValidProduct(productsData);

        if (validationResult.isValid) {
            const saveResult = save(productsData);

            if (saveResult.state === "true") {
                data = saveResult.data;
                toast = {
                    "title": "Éxito",
                    "msg": "Producto guardado correctamente",
                    "type": "success"
                }
                res.status(200).send({"toast": toast, "data": data});
            } 
        } else {
            toast = {
                "title": "Error de validación",
                "msg": validationResult.error,
                "type": "error"
            }
            res.status(400).send({"toast":toast});
        }
    } catch (error) {
        res.status(500).send({"msg": "Error al obtener datos de productos", "error": error});
    }
});


router.put("/product", (req, res) => {

    try {
        
        const productsData = req.body;

        const validationResult = isValidProduct(productsData);

        if (validationResult.isValid) {
            const updateResult = update(productsData);

            if (updateResult.state === "true") {
                data = updateResult.data;
                toast = {
                    "title": "Éxito",
                    "msg": "Producto actualizado correctamente",
                    "type": "success"
                }
                res.status(200).send({"toast": toast, "data": data});
            } 
        } else {
            toast = {
                "title": "Error de validación",
                "msg": validationResult.error,
                "type": "error"
            }
            res.status(400).send({"toast":toast});
        }
    } catch (error) {
        res.status(500).send({"msg": "Error al obtener datos de productos", "error": error});
    }
        
   
});

router.delete("/product", (req, res) => {
    try {
       
        const ID = req.body;

        
        const deleteResult = deleteID(ID);

        if (deleteResult.state === "true") {
            data = deleteResult.data;
            toast = {
                "title": "Éxito",
                "msg": "Producto eliminado correctamente",
                "type": "success"
            }
            res.status(200).send({"toast": toast, "data": data});
        }

    } catch (error) {
        res.status(500).send({"msg": "Error al obtener datos de productos", "error": error});   
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