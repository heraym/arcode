package model.productos;

public class HistorialCompra {
    
    private String id;
    private int anio;
    private int cantidad;

    public void setId(String id) {
        this.id = id;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public int getCantidad() {
        return cantidad;
    }

    public String getId() {
        return id;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

    public int getAnio() {
        return anio;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    public String getMes() {
        return mes;
    }
    private String mes;
    
    public HistorialCompra() {
        super();
    }
}
