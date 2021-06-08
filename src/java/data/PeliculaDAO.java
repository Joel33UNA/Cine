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

public class PeliculaDAO {
    
    public List<Pelicula> readAll() throws Exception{
        List<Pelicula> pelis = new ArrayList<>();
        String sql = "select* from peliculas";
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        while(rs.next()){
            pelis.add(from(rs));
        }
        return pelis;
    }
    
    public Pelicula readPelicula(String nombre) throws Exception{
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
    
    public Pelicula from (ResultSet rs){
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

    public void add(Pelicula p) throws Exception{
        String sql = "insert into peliculas (id, nombre, estado, precio)"
                + "values ('%s', '%s', '%s', '%s')";
        sql = String.format(sql, p.getId(), p.getNombre(), p.getEstado(), p.getPrecio());
        PreparedStatement stm1 = Connection.instance().prepareStatement(sql);
        if(Connection.instance().executeUpdate(stm1) == 0){
            throw new Exception("Pelicula ya existe");
        }
    }

    public void updatePeli(Pelicula peli) throws Exception {
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
}