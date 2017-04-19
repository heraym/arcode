<%@page import="java.util.List"%>
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
    List<HistorialCompra> historial = c.getHistorialCompra(id);
    Producto p = c.getProducto(id);
%>
    </head>
    <body><table>
                <tr>
                    <td>
                        <img src="img/logo.jpg"/>
                    </td>
                    <td>
                        <h2>
                           <% out.print("Historial de Compras - " + p.getNombre()); %> 
                        </h2>
                    </td>
                    <td>Bienvenido <%= userid + " - " + fecha %></td>
                </tr>
            </table>
            <table>
              <th>Año</th><th>Mes</th><th>Cantidad</th></tr>
                 <% 
                    for (int i = 0; i < historial.size(); i++) {
                     HistorialCompra h = historial.get(i);
          %>
           <tr><td><%= h.getAnio() %> </td>
            <td><%= h.getMes() %> </td>
            <td><%= h.getCantidad() %> </td>
            </tr>
            <% } %>
            </table>
            
            <hr>
              <a href="detalleProducto.jsp?id=<%= id %>">Detalle</a> 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="productos.jsp">Catalogo</a>
              
              </body>
</html>