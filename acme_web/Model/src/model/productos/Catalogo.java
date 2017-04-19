package model.productos;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.sql.Statement;

import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import javax.xml.ws.BindingType;
import javax.xml.ws.soap.SOAPBinding;

@WebService
@BindingType(SOAPBinding.SOAP12HTTP_BINDING)
public class Catalogo {
    private List<Producto> catalogo;
    
    static private String url = "jdbc:oracle:thin:acme/welcome1@localhost:1521:xe";
    
    public Catalogo() {
        super();        
    }
    public Producto getProducto(String id) {
        Connection conn;
        Statement stmt;
        
        Producto p = new Producto();
        
        try {
            DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
            conn = DriverManager.getConnection(url);
            if (conn == null) { return p; }
        } catch (Exception e) { System.out.println("Error conexion " + e.getMessage());
                                return p ; }
                                
        String query = "select productos.id, nombre, descripcion, precio, categoria.categoria, stock from " +
                     " productos, categoria where categoria.id = productos.categoria and " + 
                     " productos.id = '" + id + "'";
        
        try {
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
             rs.next();
             p.setId(rs.getString("id"));
             p.setNombre(rs.getString("nombre"));
             p.setCategoria(rs.getString("categoria"));
             p.setPrecio(rs.getDouble("precio"));
             p.setDescripcion(rs.getString("descripcion"));
             p.setStock(rs.getInt("stock"));
                
            } catch (Exception es) {  }
        
        return p;
    }
    
    public List<Producto> getCatalogo() {
                    
        Connection conn;
        Statement stmt;
        
        catalogo = new ArrayList();
        
        try {
            DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
            conn = DriverManager.getConnection(url);
            if (conn == null) { return catalogo; }
        } catch (Exception e) { System.out.println("Error conexion " + e.getMessage());
                                return catalogo ; }
                                
        String query = "select productos.id, nombre, descripcion, precio, categoria.categoria from " +
                     " productos, categoria where categoria.id = productos.categoria ";
        
        try {
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
             while (rs.next()) {
                 Producto p = new Producto();
                 p.setId(rs.getString("id"));
                 p.setNombre(rs.getString("nombre"));
                 p.setCategoria(rs.getString("categoria"));
                 p.setPrecio(rs.getDouble("precio"));
                 p.setDescripcion(rs.getString("descripcion"));
                 catalogo.add(p);
              }
            } catch (Exception es) {  }
    
      return catalogo;
    }
    public List<HistorialCompra> getHistorialCompra(String id) {
                    
        Connection conn;
        Statement stmt;
        List<HistorialCompra> historial;    
        
        historial = new ArrayList();
        
        try {
            DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
            conn = DriverManager.getConnection(url);
            if (conn == null) { return historial; }
        } catch (Exception e) { System.out.println("Error conexion " + e.getMessage());
                                return historial ; }
                                
        String query = "select anio, imes, cantidad from " +
                     " historialcompras where producto = '" + id + "'";
        
        try {
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            
             while (rs.next()) {
                 HistorialCompra h = new HistorialCompra();
                 h.setId(id);
                 h.setAnio(rs.getInt("anio"));
                 int i = rs.getInt("imes");
                  switch  (i) {
                     case 1: h.setMes("Enero");
                     case 2: h.setMes("Febrero");
                     case 3: h.setMes("Marzo");
                     case 4: h.setMes("Abril");
                     case 5: h.setMes("Mayo");
                     case 6: h.setMes("Junio");
                     case 7: h.setMes("Julio");
                     case 8: h.setMes("Agosto");
                     case 9: h.setMes("Septiembre");
                     case 10: h.setMes("Octubre");
                     case 11: h.setMes("Noviembre");
                     case 12: h.setMes("Diciembre");
                }
                h.setCantidad(rs.getInt("cantidad"));
                 historial.add(h);
              }
            } catch (Exception es) { es.printStackTrace(); }
    
      return historial;
    }
    public void consolidarStock() {
        Connection conn;
        CallableStatement stmt;
        
        try {
            DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
            conn = DriverManager.getConnection(url);
            if (conn == null) { return; }
        } catch (Exception e) { System.out.println("Error conexion " + e.getMessage());
                                return; }
        
         try {
             stmt = conn.prepareCall("{call CONSOLIDARSTOCK ()}");
          // setting input parameters on the statement object
        // statement.setString(parameterIndex, parameterValue);
         
             stmt.execute();
             stmt.close();
        } catch (Exception e) { System.out.println("Error conexion " + e.getMessage()); }
        
    }

    public void actualizarStock(String id, int stock) {
        Connection conn;
        PreparedStatement stmt;
        
        try {
            DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
            conn = DriverManager.getConnection(url);
            if (conn == null) { return; }
        } catch (Exception e) { System.out.println("Error conexion " + e.getMessage());
                                return; }
                                
        String update = "update productos set stock = " + stock + 
                        " where productos.id = '" + id + "'";
        
        try {
            stmt = conn.prepareStatement(update);
            stmt.executeUpdate();    
            } catch (Exception es) {  }
        
        return;
    }
        
}
