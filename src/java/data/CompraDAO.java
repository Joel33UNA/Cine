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
    
    public void add(Compra c) throws Exception{
        String sql = "insert into compras (id, id_cli, id_pro, precio_total)"
                + "values (%s, %s, '%s', %s, %s)";
        sql = String.format(sql, c.getId(), c.getCliente().getId(), c.getProyeccion().getId());
        PreparedStatement stm1 = Connection.instance().prepareStatement(sql);
        if(Connection.instance().executeUpdate(stm1) == 0){
            throw new Exception("Compra ya existe");
        }
    }
    
    public List<Compra> readAll() throws Exception{
        List<Compra> com = new ArrayList<>();
        String sql = "select* from compras";
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        while(rs.next()){
            com.add(from(rs));
        }
        return com;
    }
    
    public Compra readCompra(int id) throws Exception{
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
    
    private Proyeccion readProyeccion(int id) throws SQLException, Exception {
        String sql = "select* from proyecciones where id=%s";
        sql = String.format(sql, id);
        PreparedStatement stm = Connection.instance().prepareStatement(sql);
        ResultSet rs = Connection.instance().executeQuery(stm);
        if(rs.next()){
            return fromProyeccion(rs);
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
    
    public Compra from (ResultSet rs) throws Exception{
        try {
            Compra r = new Compra();
            Cliente c = new Cliente();
            Proyeccion p = new Proyeccion();
            r.setId(rs.getInt("id"));
            c = readCliente(rs.getString("id_cli"));
            p = readProyeccion(rs.getInt("id_pro"));
            r.setCliente(c);
            r.setProyeccion(p);
            return r;
        } catch (SQLException ex) {
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
    
    public Proyeccion fromProyeccion (ResultSet rs) throws Exception{
        try {
            Proyeccion r = new Proyeccion();
            Sala s = new Sala();
            Pelicula p = new Pelicula();
            r.setId(rs.getInt("id"));
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
