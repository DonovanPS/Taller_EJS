const fs = require('fs');

const filePath = 'public/data/sales.json';

const { findAll, findByID, discount } = require('./products');



const { v4: uuidv4 } = require('uuid');

module.exports = {
    findAll: () => {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            const sales = JSON.parse(data);

            const formattedData = sales.map((sale) => {
                const product = findByID(sale.Producto_ID);

                return {
                    ID: sale.ID,
                    Producto_ID: sale.Producto_ID,
                    NombreProducto: sale.NombreProducto,
                    Fecha: sale.Fecha,
                    Cliente: sale.Cliente,
                    Producto: product.data ? product.data.Nombre : sale.NombreProducto,
                    "Valor Unitario": sale.Unitario,
                    Cantidad: sale.Cantidad,
                    Total: sale.Total
                };
            });

            products = findAll();

            return { "state": "true", "data": formattedData, "formData": products.data };
        } catch (error) {
            return { "state": "false", "error": error };
        }
    },

    save: (newSale) => {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            const sales = JSON.parse(data);

            const discountProduct = discount(newSale.Producto_ID, newSale.Cantidad);



            if (discountProduct.state === "false") {

                return { "state": "false", "error": discountProduct.error };

            } else {

                newSale.ID = uuidv4();
                sales.push(newSale);

                const formattedData = sales.map((sale) => {
                    const product = findByID(sale.Producto_ID);

                    return {
                        ID: sale.ID,
                        Producto_ID: sale.Producto_ID,
                        NombreProducto: sale.NombreProducto,
                        Fecha: sale.Fecha,
                        Cliente: sale.Cliente,
                        Producto: product.data ? product.data.Nombre : sale.NombreProducto,
                        Unitario: sale.Unitario,
                        Cantidad: sale.Cantidad,
                        Total: sale.Total
                    };
                });


                fs.writeFileSync(filePath, JSON.stringify(sales, null, 2), 'utf-8');
                return { "state": "true", "data": formattedData };
            }
        } catch (error) {
            return { "state": "false", "error": error };
        }
    },

};
