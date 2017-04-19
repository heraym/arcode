package model.productos;

import java.util.List;

public class Test {
    public Test() {
        super();
    }
    public static void main (String[] args) {
        Catalogo c = new Catalogo();
        List<HistorialCompra> historial = c.getHistorialCompra("101");
        System.out.println("Historial: " + historial.size());
    }
}
