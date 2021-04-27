//Dependencias e instanciación
const express = require('express');
const app = express();
const path = require('path');
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

//Ruta para manejar las peticiones a contenido estático
app.use(express.static(path.join(__dirname,'public')));

//Servidor arriba
app.listen(port,function(){
    console.log(`Amunt amunt i fora!!! En el puerto ${port}`)
});