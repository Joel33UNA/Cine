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
import presentation.Peliculas;

public class Service {
    private static Service instancia;

    private Service() {}
    
    public static Service instancia(){
        if (instancia == null){
            instancia = new Service();
        }
        return instancia;
    }
    
    public void agregarUsuario(Usuario u) throws Exception{
        data.UsuarioDAO.add(u);
    }
    
    public void agregarSala(Sala s) throws Exception{
        data.SalaDAO.add(s);
        Sala salaRecuperada = data.SalaDAO.readSala(s.getNombre());
        for(int i = 0; i < salaRecuperada.getFilas(); i++){
            for(int j = 0; j < salaRecuperada.getColumnas(); j++){
                Butaca butaca = new Butaca(i + 1, j + 1, salaRecuperada);
                s.addButaca(butaca);
                data.ButacaDAO.add(butaca);  
            }
        }
    }
    
    public Usuario buscarUsuario(String id) throws Exception{
        Usuario usuario = data.UsuarioDAO.readUsuario(id);
        return usuario;
    }
    
    public Usuario comprobarUsuario(Usuario u) throws Exception{
        Usuario usuario = data.UsuarioDAO.read(u.id, u.clave);
        return usuario;
    }
    
    public List<Usuario> filtrarUsuarios(String nombre) throws Exception{
        List<Usuario> filtro = data.UsuarioDAO.filtrarUsuarios(nombre);
        return filtro;
    }
    
    public List<Sala> getSalas() throws Exception{
        List<Sala> filtro = data.SalaDAO.readAll();
        return filtro;
    }

    public Proyeccion proyecEspec(int id) throws Exception {
        Proyeccion proyeccion = data.ProyeccionDAO.readProyeccion(id);
        return proyeccion;
    }
    
    public List<Proyeccion> proyecsTodas() throws Exception {
        List<Proyeccion> proyeccion = data.ProyeccionDAO.readAll();
        return proyeccion;
    }

    public List<Proyeccion> proyecsPeli(String pelicula) throws Exception {
        List<Proyeccion> todas = data.ProyeccionDAO.readAll();
        List<Proyeccion> filtro = new ArrayList<>();
        for(Proyeccion p : todas){
            if(p.getPelicula().getNombre().equals(pelicula)){
                filtro.add(p);
            }
        }
        return filtro;
    }
    
    public List<Proyeccion> todas() throws Exception {
        List<Proyeccion> todas = data.ProyeccionDAO.readAll();
        return todas;
    }

    public void proyeccionAdd(Proyeccion p) throws Exception {
        data.ProyeccionDAO.add(p); 
    }

    public List<Butaca> butacasSala(String sala) throws Exception {
        int s = Integer.parseInt(sala);
        List<Butaca> todas = data.ButacaDAO.readAll();
        List<Butaca> filtro = new ArrayList<>();
        for(Butaca b : todas){
            if(b.getSala().getId() == s){
                filtro.add(b);
            }
        }
        return filtro;
    }

    public Butaca butacaEspec(int id) throws Exception{
        Butaca butaca = data.ButacaDAO.readButaca(id);
        return butaca;
    }

    public void butacaAdd(Butaca b) throws Exception{
        data.ButacaDAO.add(b);
    }


    public List<Compra> comprasCli(String id) throws Exception {
        List<Compra> todas = data.CompraDAO.readAll();
        List<Compra> filtro = new ArrayList<>();
        for(Compra c : todas){
            if(c.getCliente().getId().equals(id)){
                filtro.add(c);
            }
        }
        return filtro;    
    }

    public Compra compraEspec(int id) throws Exception {
        Compra compra = data.CompraDAO.readCompra(id);
        return compra;
    }

    public void compraAdd(Compra c) throws Exception{
        data.CompraDAO.add(c);
    }

    public List<Pelicula> peliculaSearch(String nombre) throws Exception {
        List<Pelicula> result = new ArrayList<>();
        List<Pelicula> todas = data.PeliculaDAO.readAll();
        for(Pelicula p: todas){
            if(p.getNombre().contains(nombre)) {
                result.add(p);
            } 
        }
        return result;
    }
    
    public List<Pelicula> getCartelera() throws Exception{
        List<Pelicula> result = new ArrayList<>();
        List<Pelicula> todas = data.PeliculaDAO.readAll();
        for(Pelicula p : todas){
            if(p.getEstado().equals("en cartelera")){
                result.add(p);
            }
        }
        return result;
    }

    public Pelicula pelicEspec(String nombre) throws Exception {
        Pelicula p = data.PeliculaDAO.readPelicula(nombre);
        return p;
    }

    public void peliculaAdd(Pelicula p) throws Exception {
        data.PeliculaDAO.add(p);
    }

    public void peliculaUpdate(Pelicula p) throws Exception {
        Pelicula peli = data.PeliculaDAO.readPelicula(p.getNombre());
        if(peli.getEstado().equals("en cartelera")){
            peli.setEstado("bloqueada");
        }else{
            peli.setEstado("en cartelera");
        }
        data.PeliculaDAO.updatePeli(peli);
    }
}
