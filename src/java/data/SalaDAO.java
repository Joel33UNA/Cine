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
import java.util.logging.Level;
import java.util.logging.Logger;
import logic.Butaca;
import logic.Sala;

public class SalaDAO {
    
    public static List<Sala> readAll() throws Exception{
        List<Sala> sa = new ArrayList<>();
        String sql = "select* from salas";
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        while(rs.next()){
            sa.add(from(rs));
        }
        return sa;
    }
    
    public static Sala readSala(String nombre) throws Exception{
        String sql = "select* from salas where nombre='%s'";
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
    
    public static Sala readSalaById(int id) throws Exception{
        String sql = "select* from salas where id=%s";
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
    
    public static void add(Sala s) throws Exception{
        String sql1 = "insert into salas (filas, columnas, nombre) values (%s ,%s, '%s')";
        sql1 = String.format(sql1, s.getFilas(), s.getColumnas(), s.getNombre());
        PreparedStatement stm1 = Connection.instance().prepareStatement(sql1);
        if(Connection.instance().executeUpdate(stm1) == 0){
            throw new Exception();
        }
    }
    
    public static Sala from (ResultSet rs){
        try {
            Sala r = new Sala();
            r.setId(rs.getInt("id"));
            r.setFilas(rs.getInt("filas"));
            r.setColumnas(rs.getInt("columnas"));
            r.setNombre(rs.getString("nombre"));
            r.setButacas(data.SalaDAO.readButacaBySala(r.getId()));
            return r;
        } catch (SQLException ex) {
            return null;
        } catch (Exception ex) {
            return null;
        }
    }
    
    public static List<Butaca> readButacaBySala(int id) throws Exception{
        List<Butaca> butacas = new ArrayList<>();
        String sql = "select* from butacas where id_sala=%s";
        sql = String.format(sql, id);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        while(rs.next()){
            butacas.add(fromButacas(rs));
        }
        return butacas;
    }
    
    public static Butaca fromButacas (ResultSet rs) throws Exception{
        try {
            Butaca r = new Butaca();
            r.setFila(rs.getInt("fila"));
            r.setColumna(rs.getInt("columna"));
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
}