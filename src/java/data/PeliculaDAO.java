/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

package data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import logic.Pelicula;
import logic.Proyeccion;
import logic.Sala;

public class PeliculaDAO {
    
    public static List<Pelicula> readAll() throws Exception{
        List<Pelicula> pelis = new ArrayList<>();
        String sql = "select* from peliculas";
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        while(rs.next()){
            pelis.add(from(rs));
        }
        return pelis;
    }
    
    public static Pelicula readPelicula(String nombre) throws Exception{
        String sql = "select* from peliculas where nombre=%s";
        sql = String.format(sql, nombre);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        if(rs.next()){
            return from(rs);
        }
        else{
            return null;
        }
    }
    
    public static Pelicula readPeliculaById(int id) throws Exception{
        String sql = "select* from peliculas where id=%s";
        sql = String.format(sql, id);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        if(rs.next()){
            return from(rs);
        }
        else{
            return null;
        }
    }
    
    public static void updatePeli(Pelicula peli) throws Exception {
        String sql="update peliculas set estado=? "+
                "where nombre=?";
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        stm.setString(1, peli.getEstado());
        stm.setString(2, peli.getNombre());        
        int count = Connection.instance().executeUpdate(stm);
        if (count == 0){
            throw new Exception("Pelicula no existe");
        }
    }
    
    public static void add(Pelicula p) throws Exception{
        String sql = "insert into peliculas (nombre, estado)"
                + "values ('%s', '%s')";
        sql = String.format(sql, p.getNombre(), p.getEstado());
        PreparedStatement stm1 = Connection.instance().prepareStatement(sql);
        if(Connection.instance().executeUpdate(stm1) == 0){
            throw new Exception("Pelicula ya existe");
        }
    }
    
    public static Pelicula from (ResultSet rs) throws Exception{
        try {
            Pelicula r = new Pelicula();
            r.setId(rs.getInt("id"));
            r.setNombre(rs.getString("nombre"));
            r.setEstado(rs.getString("estado"));
            r.setProyecciones(readProyeccionesByPelicula(r.getId()));
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
    
    public static List<Proyeccion> readProyeccionesByPelicula(int id) throws Exception{
        List<Proyeccion> proyecciones = new ArrayList<>();
        String sql = "select* from proyecciones where id_pelicula=%s";
        sql = String.format(sql, id);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        while(rs.next()){
            proyecciones.add(fromProyeccion(rs));
        }
        return proyecciones;
    }
    
    public static Proyeccion fromProyeccion(ResultSet rs) throws Exception{
        try {
            Proyeccion r = new Proyeccion();
            Pelicula p = new Pelicula();
            Sala s = new Sala();
            r.setId(rs.getInt("id"));
            r.setPrecio(rs.getDouble("precio"));
            s = data.SalaDAO.readSalaById(rs.getInt("id_sala"));
            r.setFecha(rs.getString("fecha")); 
            r.setSala(s);
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
}