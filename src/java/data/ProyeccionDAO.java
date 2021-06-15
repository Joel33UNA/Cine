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
import logic.Proyeccion;
import logic.Sala;

public class ProyeccionDAO {
    
    
    public static void add(Proyeccion p) throws Exception{
        String sql = "insert into proyecciones (id_sala, id_pelicula, fecha, precio)"
                + "values (%s, %s, '%s', %s)";
        sql = String.format(sql, p.getSala().getId(), p.getPelicula().getId(), p.getFecha(), p.getPrecio());
        PreparedStatement stm1 = Connection.instance().prepareStatement(sql);
        if(Connection.instance().executeUpdate(stm1) == 0){
            throw new Exception("Proyeccion ya existe");
        }
    }
    
    public static List<Proyeccion> readAll() throws Exception{
        List<Proyeccion> proyecs = new ArrayList<>();
        String sql = "select* from proyecciones";
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        while(rs.next()){
            proyecs.add(from(rs));
        }
        return proyecs;
    }
    
    public static Proyeccion readProyeccion(int id) throws Exception{
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
    
    public static List<Proyeccion> readProyeccionesByPelicula(int id) throws Exception{
        List<Proyeccion> proyecciones = new ArrayList<>();
        String sql = "select* from proyecciones where id_pelicula=%s";
        sql = String.format(sql, id);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        while(rs.next()){
            proyecciones.add(from(rs));
        }
        return proyecciones;
    }
    
    public static Proyeccion from (ResultSet rs) throws Exception{
        try {
            Proyeccion r = new Proyeccion();
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

