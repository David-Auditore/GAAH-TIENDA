-- Active: 1669383125904@@127.0.0.1@3306@login_adidas
DROP DATABASE IF EXISTS login_adidas;

create database if not exists login_adidas;

use login_adidas;

create table if not exists usuario(
    correo varchar (50) primary key,
    nombre varchar (100),
    apellido varchar(100),
    contrasenia varchar (100)
);

select * from usuario;