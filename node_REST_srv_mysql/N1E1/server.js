const port = process.env.PORT || 8080 ;
const app=require('./app');
const db = require("./models/db");

db.sequelize.sync();

 
//Servidor arriba
app.listen(port,function(){
    console.log(`Amunt amunt i fora!!! En el puerto ${port}`);
});