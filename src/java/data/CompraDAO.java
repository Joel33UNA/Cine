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
import logic.Compra;
import logic.Cliente;
import logic.Pelicula;
import logic.Proyeccion;
import logic.Sala;

public class CompraDAO {
    
    public static void add(Compra c) throws Exception{
        String sql = "insert into compras (id, id_cli, id_pro, precio_total)"
                + "values (%s, '%s', %s, %s)";
        sql = String.format(sql, c.getId(), c.getCliente().getId(), c.getProyeccion().getId());
        PreparedStatement stm1 = Connection.instance().prepareStatement(sql);
        if(Connection.instance().executeUpdate(stm1) == 0){
            throw new Exception("Compra ya existe");
        }
    }
    
    public static List<Compra> readAll() throws Exception{
        List<Compra> com = new ArrayList<>();
        String sql = "select* from compras";
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        while(rs.next()){
            com.add(from(rs));
        }
        return com;
    }
    
    public static Compra readCompra(int id) throws Exception{
        String sql = "select* from compras where id=%s";
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
    
    public static Compra from (ResultSet rs) throws Exception{
        try {
            Compra r = new Compra();
            Cliente c = new Cliente();
            Proyeccion p = new Proyeccion();
            r.setId(rs.getInt("id"));
            c = data.UsuarioDAO.readCliente(rs.getString("id_cli"));
            p = data.ProyeccionDAO.readProyeccion(rs.getInt("id_pro"));
            r.setCliente(c);
            r.setProyeccion(p);
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
}
