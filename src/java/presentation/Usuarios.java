/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

package presentation;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import logic.Service;
import logic.Usuario;
import org.glassfish.jersey.media.multipart.FormDataParam;

@Path("/usuarios")
class Usuarios {
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Usuario> search(@DefaultValue("") @QueryParam("nombre") String nombre) { 
        try{
            return Service.instancia().filtrarUsuarios(nombre);
        }
        catch(Exception ex){
            return new ArrayList<>();
        }
    } 
    
    @GET
    @Path("{cedula}")
    @Produces({MediaType.APPLICATION_JSON})
    public Usuario get(@PathParam("cedula") String cedula) {
        try {
            return Service.instancia().buscarUsuario(cedula);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }  

    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Usuario u) {  
        try {
            Service.instancia().agregarUsuario(u);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }

    /*
    NO SE EDITAN NI SE AGREGAN USUARIOS
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Usuario u) {  
        try {
            Service.instancia().usuarioUpdate(u);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    

    @DELETE
    @Path("{cedula}")
    public void del(@PathParam("cedula") String cedula) {
        try {
            Model.instance().personaDelete(cedula);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    */
}