/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/


package logic;

import data.ButacaDAO;
import data.CompraDAO;
import data.PeliculaDAO;
import data.ProyeccionDAO;
import data.SalaDAO;
import data.UsuarioDAO;

public class Service {
    private static Service instancia;
    private final UsuarioDAO usuarios;
    private final PeliculaDAO peliculas;
    private final ProyeccionDAO proyecciones;
    private final SalaDAO salas;
    private final CompraDAO compras;
    private final ButacaDAO butacas;

    public Service() {
        this.usuarios = new UsuarioDAO();
        this.peliculas = new PeliculaDAO();
        this.proyecciones = new ProyeccionDAO();
        this.salas = new SalaDAO();
        this.compras = new CompraDAO();
        this.butacas = new ButacaDAO();
    }
    
    public static Service instancia(){
        if (instancia == null){
            instancia = new Service();
        }
        return instancia;
    }
    
    public Usuario buscarUsuario(String id) throws Exception{
        Usuario usuario = usuarios.readUsuario(id);
        return usuario;
    }
}
