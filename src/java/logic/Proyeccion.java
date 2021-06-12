/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

package logic;

import java.util.Objects;


public class Proyeccion {
    private int id;
    private double precio;
    private Sala sala;
    private Pelicula pelicula;
    private String fecha;
    
    public Proyeccion(){
        this.id = 0;
        this.sala = new Sala();
        this.pelicula = new Pelicula();
        this.fecha = "";
        this.precio = 0;
    }

    public Proyeccion(int id, Sala sala, Pelicula pelicula, String fecha, double precio) {
        this.id = id;
        this.sala = sala;
        this.pelicula = pelicula;
        this.fecha = fecha;
        this.precio = precio;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    public Pelicula getPelicula() {
        return pelicula;
    }

    public void setPelicula(Pelicula pelicula) {
        this.pelicula = pelicula;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
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
        final Proyeccion other = (Proyeccion) obj;
        if (this.id != other.id) {
            return false;
        }
        if (!Objects.equals(this.sala, other.sala)) {
            return false;
        }
        if (!Objects.equals(this.pelicula, other.pelicula)) {
            return false;
        }
        return true;
    }
}
