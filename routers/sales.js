const router = require('express').Router();

const { findAll, save, update, deleteID } = require('../controllers/sales');

router.get("/", (req, res) => {
    try{
        const salesData = findAll();
       
        res.render('sales', { title: "Ventas", data: salesData.data, formData: salesData.formData });
    }catch (error){
        res.render('error', { title: "Error", error: "Error al obtener datos de ventas" });
    }
   
});


router.post("/", (req, res) => {
    try{
        const sale = req.body;

        const validationResult = isValidSale(sale);

       

        if (validationResult.isValid) {
            const saveResult = save(sale);

           

            if (saveResult.state === "true") {
                data = saveResult.data;
                toast = {
                    "title": "Éxito",
                    "msg": "Venta guardada correctamente",
                    "type": "success"
                }
                res.status(200).send({"toast": toast, "data": data});
            }else{
                toast = {
                    "title": "Error de validación",
                    "msg": saveResult.error,
                    "type": "error"
                }
                res.status(200).send({"toast":toast});
            } 
        } else {
           
            toast = {
                "title": "Error de validación",
                "msg": validationResult.error,
                "type": "error"
            }
            res.status(200).send({"toast":toast});
        }


    }catch (error){
        res.status(500).send({"msg": "Error al obtener datos de productos", "error": error});
    }
    
});






const isValidSale = (product) => {
    const requiredFields = ["Producto_ID","NombreProducto","Fecha", "Cliente",  "Cantidad", "Unitario", "Total"];

    for (const field of requiredFields) {
        if (!(field in product)) {
            return { isValid: false, error: `Campo requerido "${field}" no presente.` };
        }
    }

    return { isValid: true };
};





module.exports = router;