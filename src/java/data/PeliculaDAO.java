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
    
    public Pelicula readPelicula(int id) throws Exception{
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
}