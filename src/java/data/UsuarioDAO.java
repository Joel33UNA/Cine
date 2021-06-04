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
import logic.Administrador;
import logic.Cliente;
import logic.Usuario;

public class UsuarioDAO {
    
    public Usuario read(String id, String clave) throws Exception{
        String sql="select * from usuarios where id=%s and clave=%s";
        sql = String.format(sql, id, clave);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs =  Connection.instance().executeQuery(stm);           
        if (rs.next()) {
            return from(rs);
        }
        else{
            throw new Exception ("¡Error!");
        }
    }
    
    public Usuario readAll() throws Exception{
        String sql="select * from usuarios";
        sql = String.format(sql);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs =  Connection.instance().executeQuery(stm);           
        if (rs.next()) {
            return from(rs);
        }
        else{
            throw new Exception ("¡Error!");
        }
    }
    
    public Usuario readUsuario(String id) throws Exception{
        String sql = "select* from usuarios where id=%s";
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
    
    public Administrador readAdministrador(String id) throws Exception{
        String sql = "select* from administradores, usuarios where "
                + "administradores.id = usuarios.id and administradores.id=%s";
        sql = String.format(sql,id);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        if(rs.next()){
            return fromAdministrador(rs);
        }
        else{
            throw new Exception("Administrador no existe.");
        }
    }
    
    public Cliente readCliente(String id) throws Exception{
        String sql = "select* from clientes, usuarios where "
                + "clientes.id = usuarios.id and clientes.id=%s";
        sql = String.format(sql, id);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        if(rs.next()){
            return fromCliente(rs);
        }
        else{
            return null;
        }
    }
    
    public Usuario from (ResultSet rs){
        try {
            String rol = rs.getString("rol");
            Usuario r = null;
            switch(rol){
                case "cliente": { r = new Cliente(); break;}
                case "administrador": { r = new Administrador(); break; }
            }
            r.setRol(rol);
            r.setId(rs.getString(("id")));
            r.setNombre(rs.getString("nombre"));
            r.setClave(rs.getString("clave"));
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
    
    public Administrador fromAdministrador(ResultSet rs){
        try{
            Administrador r = new Administrador();
            r.setRol("administrador");
            r.setId(rs.getString("id"));
            r.setClave(rs.getString("clave"));
            r.setNombre(rs.getString("nombre"));
            return r;
        }
        catch(SQLException ex){
            return null;
        }
    }
    
    public Cliente fromCliente (ResultSet rs){
        try {
            Cliente r = new Cliente();
            r.setId(rs.getString("id"));
            r.setNombre(rs.getString("nombre"));
            r.setRol(rs.getString("rol"));
            r.setClave(rs.getString("clave"));
            r.setNumTarjeta(rs.getString("numTarjeta"));
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
}