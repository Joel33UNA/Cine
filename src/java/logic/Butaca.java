/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

package logic;

public class Butaca {
    private int fila;
    private int columna;
    private Sala sala;
    
    public Butaca(){
        this.fila = 0;
        this.columna = 0;
        this.sala = new Sala();
    }

    public Butaca(int fila, int columna, Sala sala) {
        this.fila = fila;
        this.columna = columna;
        this.sala = sala;
    }

    public int getFila() {
        return fila;
    }

    public void setFila(int fila) {
        this.fila = fila;
    }

    public int getColumna() {
        return columna;
    }

    public void setColumna(int columna) {
        this.columna = columna;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }
}
