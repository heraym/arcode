  <%
    String userid = request.getParameter("usuario");    
    String pwd = request.getParameter("password");
    if (userid != null) {
        if (pwd.equals("1234")) {
          session.setAttribute("userid", userid);
          //out.println("welcome " + userid);
          //out.println("<a href='logout.jsp'>Log out</a>");
          response.sendRedirect("faces/productos.jsp");
          return;
          } 
     }  
%>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=windows-1252"%>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<f:view>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=windows-1252"/>
            
          
        </head>
        <body>
            <table>
                <tr>
                    <td>
                        <img src="img/logo.jpg"/>
                    </td>
                    <td>
                        <h2>
                            Gestion de Productos
                        </h2>
                    </td>
                </tr>
            </table>
            <form action="login.jsp">
                <table>
                            <tr>
                                <td>Usuario :</td>
                                <td><input id="usuario" name="usuario" type="text" size="30" /></td><td><a style="font-size: 10px; font-family:lucida sans; color: darkgray">[cualquier usuario]</a></td>
                            </tr>
                            <tr>
                                <td>Password :</td>
                                <td><input id="pass" name="password" type="password" size="30" /></td><td><a style="font-size: 10px; font-family:lucida sans; color: darkgray">[Pass = 1234]</a></td>
                            </tr>
                            <tr>
                                <td><input type="submit" value="Submit"/></td>
                            </tr>
                        </table>
            </form>
        </body>
    </html>
</f:view>