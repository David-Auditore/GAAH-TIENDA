const mysql2 = require('mysql2');

let conexion = mysql2.createConnection({
    host: 'localhost',
    database: 'login_adidas',
    user: 'root',
    password: '0622'
});

conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Connected Database');
    }
});

/*

conexion.query('select * from usuario', function (error, result, fields) {
    if (error)
        throw error;

    result.forEach(result => {
        console.log(result);
    });
});

conexion.query('insert into usuario (correo, nombre, apellido, contrasenia) values ("Adam@gmail.com", "Adam", "Smith","2004")', function (error, results) {
    if (error) throw error;
    console.log('Registro Agregado', results);
})

*/
module.exports = conexion;