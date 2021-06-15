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
import logic.Butaca;
import logic.Sala;

public class ButacaDAO {
    
    public static void add(Butaca b) throws Exception{
        String sql = "insert into butacas (id_sala, fila, columna)"
                + " values (%s, %s, %s)";
        sql = String.format(sql, b.getSala().getId(), b.getFila(), b.getColumna());
        PreparedStatement stm1 = Connection.instance().prepareStatement(sql);
        if(Connection.instance().executeUpdate(stm1) == 0){
            throw new Exception("Butaca ya existe");
        }
    }
    
    public static List<Butaca> readAll() throws Exception{
        List<Butaca> bu = new ArrayList<>();
        String sql = "select* from butacas";
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        while(rs.next()){
            bu.add(from(rs));
        }
        return bu;
    }
    
    public static Butaca readButaca(int id) throws Exception{
        String sql = "select* from butacas where id=%s";
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
    
    public static List<Butaca> readButacaBySala(int id) throws Exception{
        List<Butaca> butacas = new ArrayList<>();
        String sql = "select* from butacas where id_sala=%s";
        sql = String.format(sql, id);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        while(rs.next()){
            butacas.add(from(rs));
        }
        return butacas;
    }
    
    public static Butaca from (ResultSet rs) throws Exception{
        try {
            Sala s = new Sala();
            Butaca r = new Butaca();
            s = data.SalaDAO.readSalaById(rs.getInt("id_sala"));
            r.setFila(rs.getInt("fila"));
            r.setColumna(rs.getInt("columna"));
            r.setSala(s);
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
}
