create database node;

use node;

create table Users(
    id int PRIMARY KEY,
    nombre VARCHAR(30),
    apellidos VARCHAR(30),
    email VARCHAR(30),
    nombreUsuario VARCHAR(15),
    pass int(10)
)