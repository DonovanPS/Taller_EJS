const fs = require('fs');

const filePath = 'public/data/products.json';

const { v4: uuidv4 } = require('uuid');

module.exports = {
    findAll: () => {
        try {
           
            const data = fs.readFileSync(filePath, 'utf-8');
            const products = JSON.parse(data);

            
            return { "state": "true", "data": products };
        } catch (error) {
            return { "state": "false", "error": error };
        }
    },
    save: (newProduct) => {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            const products = JSON.parse(data);
    
            newProduct.ID = uuidv4();  
            products.push(newProduct);

            fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
            return { "state": "true", "data": products };
        } catch (error) {
            return { "state": "false", "error": error };
        }
    },
    update: (product) => {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            const products = JSON.parse(data);

            const index = products.findIndex((p) => p.ID === product.ID);
            products[index] = product;

            fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
            return { "state": "true", "data": products };
        } catch (error) {
            return { "state": "false", "error": error };
        }
    },
    deleteID: (id) => {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            const products = JSON.parse(data);

            const index = products.findIndex((p) => p.ID === id);
            products.splice(index, 1);

            fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
            return { "state": "true", "data": products };
        } catch (error) {
            return { "state": "false", "error": error };
        }
    },
    findByID: (id) => {
        try {

           
            const data = fs.readFileSync(filePath, 'utf-8');
            const products = JSON.parse(data);

            const product = products.find((p) => p.ID === id);

        
        

            return { "state": "true", "data": product };
        } catch (error) {
           
            return { "state": "false", "error": error };
        }
    },
    discount: (id, quantity) => {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            const products = JSON.parse(data);

            const product = products.find((p) => p.ID === id);

            if (product.Cantidad < quantity) {
                return { "state": "false", "error": "Error en las cantidades, cantidad maxima: "+product.Cantidad };
            } else {
                product.Cantidad = product.Cantidad - quantity;
                fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
                return { "state": "true", "data": products };
            }
        } catch (error) {
            return { "state": "false", "error": error };
        }
    }
};
