/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package presentation;

import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import org.glassfish.jersey.media.multipart.MultiPartFeature;

@ApplicationPath("api")
public class RegistroApplication extends Application {
    @Override
    public Set<Class<?>> getClasses() {

        HashSet<Class<?>> classes = new HashSet<>();
        classes.add(MultiPartFeature.class);
        System.out.println("added multipart feature");
        classes.add(Clientes.class);
        classes.add(Administradores);
        classes.add(Peliculas);
        classes.add(Salas);
        classes.add(Proyecciones);
        classes.add(Compras);
        classes.add(Butacas);
        return classes;
    }   
}