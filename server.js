const express = require('express');

const app = express();

//Setters
app.set('PORT', process.env.PORT || 3000);

//Middlewares
app.use(express.json());


app.listen(app.get('PORT'), ()=>{
    console.log(`Server on port ${app.get('PORT')}`)
});
