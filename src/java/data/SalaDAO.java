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
import logic.Sala;

public class SalaDAO {
    
    public Sala readAll() throws Exception{
        String sql = "select* from salas";
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
    
    public Sala readSala(int id) throws Exception{
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
    
    public Sala from (ResultSet rs){
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