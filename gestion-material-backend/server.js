const express = require('express');
const mysql = require('mysql2')
const app = express();
app.use(express.json());

// Conexión con la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'foc2026',
    database: 'gestion_material'
})

db.connect((err) =>{
    if(err) throw err;
    console.log('Conectado a MySQL');
});

// Ruta para obtener empleados
app.get('api/empleados',(req,res)=>{
    db.query('SELECT * FROM empleados', (err, results) =>{
        if(err) throw err;
        res.json(results);
    });
});

// Ruta para obtener materiales
app.get('api/materiales',(req,res)=>{
    db.query('SELECT * FROM materiales', (err, results) =>{
        if(err) throw err;
        res.json(results);
    });
});

const PORT = 3000;
app.listen(PORT,()=>{
    console.log('Servidor escuchando en el puerto ${PORT}');
});