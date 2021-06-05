/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

package logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Pelicula {
    int id;
    String nombre;
    String estado;
    int precio;
    List<Proyeccion> proyecciones;
    
    public Pelicula(){
        this.id = 0;
        this.nombre = "";
        this.estado = "";
        this.precio = 0;
        this.proyecciones = new ArrayList<>();
    }

    public Pelicula(int id, String nombre, String estado, int precio) {
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.precio = precio;
        this.proyecciones = new ArrayList<>();
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public int getId() {
        return id;
    }

    public int getPrecio() {
        return precio;
    }

    public void setPrecio(int precio) {
        this.precio = precio;
    }
    
    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Proyeccion> getProyecciones() {
        return proyecciones;
    }

    public void setProyecciones(List<Proyeccion> proyecciones) {
        this.proyecciones = proyecciones;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Pelicula other = (Pelicula) obj;
        if (this.id != other.id) {
            return false;
        }
        if (!Objects.equals(this.nombre, other.nombre)) {
            return false;
        }
        if (!Objects.equals(this.estado, other.estado)) {
            return false;
        }
        return true;
    }
}
