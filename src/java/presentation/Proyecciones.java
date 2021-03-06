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
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
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
    
    @RolesAllowed({"administrador"})
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Proyeccion> getAll() { 
        try {
            return Service.instancia().proyecsTodas();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
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
    
    @RolesAllowed({"administrador"})
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Proyeccion p) {  
        try {
            Service.instancia().proyeccionAdd(p);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
}
