<%@page import="model.productos.*"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.text.SimpleDateFormat"%>
<%
    String userid = (String) session.getAttribute("userid");
         
    if (userid == null)  {
       response.sendRedirect("faces/login.jsp");
       return;
    }   
    Date fechaActual = new Date();
        
     //Formateando la fecha:
    DateFormat formato = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    String fecha = formato.format(fechaActual);
%>

<!DOCTYPE html>
<%@ page contentType="text/html;charset=windows-1252"%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252"/>
     <%
    String id = request.getParameter("id"); 
    Catalogo c = new Catalogo();
    Producto p = c.getProducto(id);
  
    String actualizar = request.getParameter("btActualizarStock");
    if (actualizar != null) {
     System.out.println("Actualizar Stock");
     String stock = request.getParameter("stock");
     p.setStock(new Integer(stock).intValue());
     c.actualizarStock(id, p.getStock());
     
    }
    String consolidar = request.getParameter("btConsolidar");
    if (consolidar != null) { 
    System.out.println("Consolidar");
     c.consolidarStock();
    }
    
%>
    </head>
    <body><table>
                <tr>
                    <td>
                        <img src="img/logo.jpg"/>
                    </td>
                    <td>
                        <h2>
                           <% out.print(p.getNombre()); %> 
                        </h2>
                    </td>
                    <td>Bienvenido <%= userid + " - " + fecha %></td>
                </tr>
            </table>
            <table><tr><td>Id: <%= p.getId() %> </td><td></td><td rowspan="4"><img height="250px" width="250px" src="img/productos/<%= id %>.png"/></td></tr>
            <tr><td colspan="2">Nombre: <%= p.getNombre() %> </td></tr>
            <tr><td colspan="2">Descripcion: <%= p.getDescripcion() %> </td></tr>
            <tr><td>Precio Unitario: $<%= p.getPrecio() %> </td><td><form
              action="detalleProducto.jsp">
              <a href="historialCompra.jsp?id=<%= p.getId() %>"> Historial de Compras </a>
              <input type="hidden" name="id" value="<%= id %>"/>
              &nbsp; &nbsp; &nbsp; <button type="submit" name="btConsolidar" value="consolidar">Consolidar Stock</button>
              </form>
            </td></tr>
            </table>
            <hr> 
              <form
              action="detalleProducto.jsp">
              <input type="hidden" name="id" value="<%= id %>"/>
              Stock Actual : <%= p.getStock() %><br>
              Nuevo Stock  : <input type="text" name="stock"/><br>
              <button type="submit" name="btActualizarStock" value="actualizar">Actualizar Stock</button>
              </form>
              <hr>
              <a href="productos.jsp">Catalogo</a>
              </body>
</html>