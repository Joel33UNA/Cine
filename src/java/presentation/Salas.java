/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

package presentation;

import java.util.List;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import logic.Sala;
import logic.Service;

@Path("/salas")
public class Salas {
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Sala> searchAll() { 
        try{
            return Service.instancia().getSalas();
        }
        catch(Exception ex){
            throw new NotAcceptableException(); 
        }
    }
}
