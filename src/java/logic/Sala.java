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

public class Sala {
    int id;
    List<Butaca> butacas;
    
    public Sala(){
        this.id = 0;
        this.butacas = new ArrayList<>();
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
}
