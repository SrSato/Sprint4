//Dependencias e instanciación
const express = require('express');
const app = express();
const port = 8080

//Enrutamiento
app.get('/user', function(req,res){
    let requestedURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    
    res.json({
        name: 'Sera',
        age: 41,
        requestedURL: requestedURL
    })
});

//Servidor arriba
app.listen(port,function(){
    console.log(`Amunt amunt i fora!!! En el puerto ${port}`)
});