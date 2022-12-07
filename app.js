const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const dataBase = require('./routes/dbConfig');

const app = express();

app.use(cookieParser());

const timeEXp = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "rfghf66a76ythggi87au7td",
    saveUninitialized: true,
    cookie: { maxAge: timeEXp },
    resave: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/public/', express.static('./public'));

const port = 3000;

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/registro', (req, res) => {
    res.render('registro');
});

app.post('/registro', (req, res) => {

    const correo = req.body.correo;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const contrasenia = req.body.contrasenia;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(contrasenia, salt);

    dataBase.query('insert into usuario (correo, nombre, apellido, contrasenia) values (?,?,?,?)',
        [correo, nombre, apellido, hash],
        (error) => {
            if (error) throw error;
            res.render('index')
            console.log("Inserción de datos exitosa");
            console.log("User:", correo, "Hash:", hash);
        });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {

    let correo = req.body.correo;
    let contrasenia = req.body.contrasenia;

    dataBase.query("SELECT contrasenia FROM usuario WHERE correo=?", [correo], (error, data) => {
        if (error) throw error;

        if (data.length > 0) {

            let contraseniaEncriptada = data[0].contrasenia;
            if (bcrypt.compareSync(contrasenia, contraseniaEncriptada)) {
                req.session.correo = correo;
                return res.render('shop')
                console.log('Inicio de sesion exitoso');
            }
            return res.send('Usuario o contraseña incorrecta');
        }
        return res.send('Usuario o contraseña incorrecta');
    });
});

app.get('/test-cookies', (req, res) => {

    let session = req.session;
    if (session.correo) {
        res.send(`Usted tiene una sesión en nuestro sistema con correo: ${session.correo}`);
    } else {
        res.send('Por favor inicie sesión para acceder a esta ruta protegida')
    }
});

app.get('/shop', (req, res) => {
    res.render('shop')
})

app.listen(port, () => {
    console.log(`¡Server up! in port:${port}`);
});