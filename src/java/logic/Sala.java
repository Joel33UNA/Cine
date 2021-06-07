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

public class Sala {
    private int id;
    private int filas;
    private int columnas;
    private List<Butaca> butacas;
    
    public Sala(){
        this.id = 0;
        this.filas = 0;
        this.columnas = 0;
        this.butacas = new ArrayList<>();
    }

    public Sala(int id, int filas, int columnas, List<Butaca> butacas) {
        this.id = id;
        this.filas = filas;
        this.columnas = columnas;
        this.butacas = butacas;
    }

    public int getFilas() {
        return filas;
    }

    public void setFilas(int filas) {
        this.filas = filas;
    }

    public int getColumnas() {
        return columnas;
    }

    public void setColumnas(int columnas) {
        this.columnas = columnas;
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Butaca> getButacas() {
        return butacas;
    }

    public void setButacas(List<Butaca> butacas) {
        this.butacas = butacas;
    }

    @Override
    public int hashCode() {
        int hash = 5;
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
        final Sala other = (Sala) obj;
        if (this.id != other.id) {
            return false;
        }
        if (!Objects.equals(this.butacas, other.butacas)) {
            return false;
        }
        return true;
    }
}
