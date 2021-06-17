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
import logic.Pelicula;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import org.glassfish.jersey.media.multipart.FormDataParam;

@PermitAll
@Path("/peliculas")
public class Peliculas {
    String location="C:/imagenesProyecto/peliculas/";
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Pelicula> search(@DefaultValue("") @QueryParam("nombre") String nombre) { 
        try {
            return Service.instancia().peliculaSearch(nombre);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    } 
    
    @GET
    @Path("cartelera")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Pelicula> getCartelera() { 
        try {
            return Service.instancia().getCartelera();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    } 
    
    @GET
    @Path("{nombre}")
    @Produces({MediaType.APPLICATION_JSON})
    public Pelicula get(@PathParam("nombre") String nombre) {
        try {
            return Service.instancia().pelicEspec(nombre);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @GET
    @Path("{nombre}/imagen")
    @Produces("image/png")
    public Response getImge(@PathParam("nombre") String nombre) throws IOException {
        File file = new File(location+nombre);
        ResponseBuilder response = Response.ok((Object) file);
        return response.build();
    }    
    
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA) 
    @Path("{nombre}/imagen")
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

    @POST
    @Path("agregar")
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Pelicula p) {  
        try {
            Service.instancia().peliculaAdd(p);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @PUT
    @Path("actualizar")
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Pelicula p) {  
        try {
            Service.instancia().peliculaUpdate(p);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }   
}
