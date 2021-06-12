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

public class ProyeccionDAO {
    
    public void add(Proyeccion p) throws Exception{
        String sql = "insert into proyecciones (id_sala, id_pelicula, fecha, precio)"
                + "values (%s, %s, '%s', %s)";
        sql = String.format(sql, p.getSala().getId(), p.getPelicula().getId(), p.getFecha(), p.getPrecio());
        PreparedStatement stm1 = Connection.instance().prepareStatement(sql);
        if(Connection.instance().executeUpdate(stm1) == 0){
            throw new Exception("Proyeccion ya existe");
        }
    }
    
    public List<Proyeccion> readAll() throws Exception{
        List<Proyeccion> proyecs = new ArrayList<>();
        String sql = "select* from proyecciones";
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        while(rs.next()){
            proyecs.add(from(rs));
        }
        return proyecs;
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
            r.setPrecio(rs.getDouble("precio"));
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
            r.setNombre(rs.getString("nombre"));
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
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
}

