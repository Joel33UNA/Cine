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
import logic.Compra;
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

@Path("/compras")
public class Compras {
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Compra> getComprasCli(@DefaultValue("") @QueryParam("cliente") String cliente) { 
        try {
            return Service.instancia().comprasCli(cliente);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Compra get(@PathParam("id") int proyeccion) {
        try {
            return Service.instancia().compraEspec(proyeccion);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Compra c) {  
        try {
            Service.instancia().compraAdd(c);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
}
