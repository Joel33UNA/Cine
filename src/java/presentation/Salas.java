/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

package presentation;

import java.util.List;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import logic.Sala;
import logic.Service;

@PermitAll
@Path("/salas")
public class Salas {
    
    @GET
    @PermitAll
    @Produces({MediaType.APPLICATION_JSON})
    public List<Sala> searchAll() { 
        try{
            return Service.instancia().getSalas();
        }
        catch(Exception ex){
            throw new NotAcceptableException(); 
        }
    }
    
    @POST
    @RolesAllowed({"administrador"})
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Sala s) {  
        try {
            Service.instancia().agregarSala(s);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
}
