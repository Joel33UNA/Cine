/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

package presentation;

import javax.ws.rs.Consumes;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import logic.Service;
import logic.Usuario;

@Path("/sesiones")
public class Sesiones {
    
    @POST
    @Path("comprobar")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes(MediaType.APPLICATION_JSON)
    public Usuario comprobar(Usuario u){
        try{
            return Service.instancia().comprobarUsuario(u);
        }
        catch(Exception ex){
            throw new NotAcceptableException(); 
        }
    }
}
