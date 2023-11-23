const fs = require('fs');

const filePath = 'public/data/products.json';

module.exports = {
    findAll: (req, res) => {
        try {
           
            const data = fs.readFileSync(filePath, 'utf-8');
            const products = JSON.parse(data);

            
            return { "state": "true", "data": products };
        } catch (error) {
            return { "state": "false", "error": error };
        }
    },
};
