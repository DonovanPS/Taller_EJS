const express = require('express');

const app = express();

const path = require('path');

//Setters
app.set('PORT', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views')); 
app.set('view engine', 'ejs');   

//Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}))
app.use("/", require('./routers/index.js'));  

app.use("/products", require('./routers/index.js'));

app.use("/api/products", require('./routers/products.js'));



app.listen(app.get('PORT'), ()=>{
    console.log(`Server on port ${app.get('PORT')}`)
});
