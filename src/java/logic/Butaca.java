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
    private Compra compra;
    
    public Butaca(){
        this.fila = 0;
        this.columna = 0;
        this.compra = new Compra();
    }

    public Butaca(int fila, int columna, Compra compra) {
        this.fila = fila;
        this.columna = columna;
        this.compra = compra;
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

    public Compra getCompra() {
        return compra;
    }

    public void setCompra(Compra compra) {
        this.compra = compra;
    }

}
