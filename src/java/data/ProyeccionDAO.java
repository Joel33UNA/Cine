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
import logic.Pelicula;
import logic.Proyeccion;
import logic.Sala;

public class ProyeccionDAO {
    
    public Proyeccion readAll() throws Exception{
        String sql = "select* from proyecciones";
        sql = String.format(sql);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        if(rs.next()){
            return from(rs);
        }
        else{
            return null;
        }
    }
    
    public Proyeccion readProyeccion(int id) throws Exception{
        String sql = "select* from proyecciones where id=%s";
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
    
    public Sala readSala(int id) throws Exception{
        String sql = "select* from salas where id=%s";
        sql = String.format(sql, id);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        if(rs.next()){
            return fromSala(rs);
        }
        else{
            return null;
        }
    }
    
    public Pelicula readPelicula(int id) throws Exception{
        String sql = "select* from peliculas where id=%s";
        sql = String.format(sql, id);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        if(rs.next()){
            return fromPelicula(rs);
        }
        else{
            return null;
        }
    }
    
    public Proyeccion from (ResultSet rs) throws Exception{
        try {
            Proyeccion r = new Proyeccion();
            Sala s = new Sala();
            Pelicula p = new Pelicula();
            r.setId(rs.getInt("id"));
            s = readSala(rs.getInt("id_sala"));
            p = readPelicula(rs.getInt("id_pelicula"));
            r.setFecha(rs.getString("fecha")); 
            r.setSala(s);
            r.setPelicula(p);
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
    
    public Sala fromSala (ResultSet rs){
        try {
            Sala r = new Sala();
            r.setId(rs.getInt("id"));
            r.setFilas(rs.getInt("filas"));
            r.setColumnas(rs.getInt("columnas"));
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
    
    public Pelicula fromPelicula (ResultSet rs){
        try {
            Pelicula r = new Pelicula();
            r.setId(rs.getInt("id"));
            r.setNombre(rs.getString("nombre"));
            r.setEstado(rs.getString("estado"));
            r.setPrecio(rs.getInt("precio"));
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
}

