create database cine;
use cine;

create table usuarios(
    id varchar(45) not null,
    clave varchar(45),
    rol varchar(45),
    nombre varchar(45),
    primary key (id)
  );
  
create table administradores(
    id varchar(45) not null,
    primary key (id),
    foreign key (id) references usuarios(id)
);

create table clientes(
    id varchar(45) not null,
    primary key (id),
    foreign key (id) references usuarios(id)
);

create table peliculas(
    id int not null AUTO_INCREMENT,
    nombre varchar(45),
    estado varchar(45),
    primary key(id)
);

create table salas(
    id int not null AUTO_INCREMENT,
    filas int,
    columnas int,
    nombre varchar(45),
    primary key(id),
    UNIQUE KEY(nombre)
);

create table proyecciones(
    id int not null AUTO_INCREMENT,
    id_sala int,
    id_pelicula int,
    fecha varchar(45),
    precio double,
    primary key (id),
    foreign key (id_sala) references salas(id),
    foreign key (id_pelicula) references peliculas(id)
);

create table compras(
    id int not null AUTO_INCREMENT,
    id_cli varchar(45),
    id_pro int,
    precio_total double,
    primary key (id),
    foreign key (id_cli) references clientes(id),
    foreign key (id_pro) references proyecciones(id)
);

create table butacas(
    id_compra int,
    fila int,
    columna int,
    primary key (id_compra, fila, columna),
    foreign key (id_compra) references compras(id)
);


alter table usuarios add constraint usuarios_ck_rol check (rol in ('administrador','cliente'));