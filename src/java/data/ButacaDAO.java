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
import logic.Butaca;
import logic.Sala;

public class ButacaDAO {
    
    public Butaca readAll() throws Exception{
        String sql = "select* from butacas";
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
    
    public Butaca readButaca(int id) throws Exception{
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
    
    public Butaca from (ResultSet rs) throws Exception{
        try {
            Sala s = new Sala();
            Butaca r = new Butaca();
            s = readSala(rs.getInt("id_sala"));
            r.setId(rs.getInt("id"));
            r.setEstado(rs.getString("estado"));
            r.setSala(s);
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
}
