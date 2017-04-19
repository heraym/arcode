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
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<f:view>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=windows-1252"/>
            <style>
table {
    border-collapse: collapse;
    border: 1px solid black;
    width: 100%;
}
th {
    text-align: left;
    height: 50px;
    padding: 15px;
}
td {
    padding: 15px;
}
</style>
        </head>
        <body>
            <table><tr><td><img src="img/logo.jpg"/></td><td> <h2>Gestion de Productos </h2></td><td>Bienvenido <%= userid + " - " + fecha %></td></tr></table>
            <table><tr>
                <th>ID</th><th>Nombre</th><th>Categoria</th><th>Descripcion</th></tr>
                 <% Catalogo c = new Catalogo();
                    List<Producto> productos = c.getCatalogo();
                    for (int i = 0; i < productos.size(); i++) {
                     Producto p = (Producto) productos.get(i);
                %>
                <tr><td><a href="detalleProducto.jsp?id=<%= p.getId() %>"><%out.print(p.getId());%></a></td>
                <td><%out.print(p.getNombre());%></td>
                <td><%out.print(p.getCategoria());%></td>
                <td><%out.print(p.getDescripcion());%></td></tr>
                <% } %>
               
            </table>
        </body>
    </html>
</f:view>