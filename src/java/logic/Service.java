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
import java.util.ArrayList;
import java.util.List;

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
    
    public void agregarUsuario(Usuario u) throws Exception{
        usuarios.add(u);
    }
    
    public Usuario buscarUsuario(String id) throws Exception{
        Usuario usuario = usuarios.readUsuario(id);
        return usuario;
    }
    
    public List<Usuario> filtrarUsuarios(String nombre) throws Exception{
        List<Usuario> filtro = usuarios.filtrarUsuarios(nombre);
        return filtro;
    }

    public Proyeccion proyecEspec(int id) throws Exception {
        Proyeccion proyeccion = proyecciones.readProyeccion(id);
        return proyeccion;
    }
    
    public List<Proyeccion> proyecsTodas() throws Exception {
        List<Proyeccion> proyeccion = proyecciones.readAll();
        return proyeccion;
    }

    public List<Proyeccion> proyecsPeli(String pelicula) throws Exception {
        List<Proyeccion> todas = proyecciones.readAll();
        List<Proyeccion> filtro = new ArrayList<>();
        for(Proyeccion p : todas){
            if(p.getPelicula().getNombre().equals(pelicula)){
                filtro.add(p);
            }
        }
        return filtro;
    }

    public void proyeccionAdd(Proyeccion p) throws Exception {
        proyecciones.add(p); 
    }

    public List<Butaca> butacasSala(String sala) throws Exception {
        int s = Integer.parseInt(sala);
        List<Butaca> todas = butacas.readAll();
        List<Butaca> filtro = new ArrayList<>();
        for(Butaca b : todas){
            if(b.getSala().getId() == s){
                filtro.add(b);
            }
        }
        return filtro;
    }

    public Butaca butacaEspec(int id) throws Exception{
        Butaca butaca = butacas.readButaca(id);
        return butaca;
    }

    public void butacaAdd(Butaca b) throws Exception{
        butacas.add(b);
    }


    public List<Compra> comprasCli(String id) throws Exception {
        List<Compra> todas = compras.readAll();
        List<Compra> filtro = new ArrayList<>();
        for(Compra c : todas){
            if(c.getCliente().getId().equals(id)){
                filtro.add(c);
            }
        }
        return filtro;    
    }

    public Compra compraEspec(int id) throws Exception {
        Compra compra = compras.readCompra(id);
        return compra;
    }

    public void compraAdd(Compra c) throws Exception{
        compras.add(c);
    }
}
