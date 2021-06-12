/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

package presentation;

import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import logic.Service;
import logic.Proyeccion;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import org.glassfish.jersey.media.multipart.FormDataParam;


@Path("/proyecciones")
public class Proyecciones {
    String location="C:/imagenesProyecto/proyecciones/";
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Proyeccion> todas() { 
        try {
            return Service.instancia().todas();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @GET
    @Path("{nombre}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Proyeccion> search(@PathParam("nombre") String nombre) {
        try {
            return Service.instancia().proyecsPeli(nombre);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Proyeccion get(@PathParam("id") int id) {
        try {
            return Service.instancia().proyecEspec(id);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    } 
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Proyeccion p) {  
        try {
            Service.instancia().proyeccionAdd(p);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    
    //*******************PROYECCION NO TIENE IMAGEN
    /*
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA) 
    @Path("{cedula}/imagen")
    public void addImage(@PathParam("nombre") String nombre, @FormDataParam("imagen") InputStream imagenStream) {  
        try{
            int read = 0;
            byte[] bytes = new byte[1024];
            OutputStream out = new FileOutputStream(new File(location + nombre));
            while ((read = imagenStream.read(bytes)) != -1){
                out.write(bytes, 0, read);
            }
            out.flush();
            out.close();
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @GET
    @Path("{nombre}/imagen")
    @Produces("image/png")
    public Response getImge(@PathParam("nombre") String nombre) throws IOException {
        File file = new File(location+nombre);
        Response.ResponseBuilder response = Response.ok((Object) file);
        return response.build();
    }
    */ 
}
