/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

package presentation;

import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import logic.Service;
import logic.Usuario;

@PermitAll
@Path("/sesiones")
public class Sesiones {
    @Context
    private HttpServletRequest request;
    
    @POST
    @Path("comprobar")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes(MediaType.APPLICATION_JSON)
    public Usuario comprobar(Usuario u){
        try{
            Usuario us = Service.instancia().comprobarUsuario(u);
            request.getSession(true).setAttribute("user", us);
            return us;        
        }
        catch(Exception ex){
            throw new NotAcceptableException(); 
        }
    }
    
    @POST
    @Path("registrarse")
    @Consumes(MediaType.APPLICATION_JSON)
    public void add(Usuario u){
        try{
            Service.instancia().agregarUsuario(u);
        }
        catch(Exception ex){
            throw new NotAcceptableException();
        }
    }
    
    @DELETE
    public void logout(){
        try{
            HttpSession sesion = request.getSession(true);
            sesion.removeAttribute("user"); 
            sesion.invalidate();
        }
        catch(Exception ex){
            throw new NotAcceptableException();
        }
    }
}
