/* EN ESTA FUNCION SE DEBE COMPROBAR EL ROL DEL USUARIO LOGEADO */
function nav(){
    var div = $("#nav");
    div.html("");
    div.html("<nav class='navbar navbar-expand-lg navbar-light' style='background-color: #f8eac9;'>" +
            "<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>" +
                "<span class='navbar-toggler-icon'></span>" +
            "</button>" +
            "<div class='collapse navbar-collapse' id='navbarSupportedContent'>" +
                "<ul class='navbar-nav mr-auto'>" +
                    "<li class='nav-item'>" +
                        "<a class='btn btn-light' href='/Cine/'>Inicio</a>" +
                    "</li>" +
                    "<li class='nav-item'>" +
                        "<a class='btn btn-light' href='#' role='button' id='login'>Iniciar sesión</a>" +
                    "</li>" +
                    "<li class='nav-item'>" +
                        "<a class='btn btn-light' href='#' role='button' id='checkin'>Registrarse</a>" +
                    "</li>" +
                "</ul>" +
                "<form class='form-inline my-2 my-lg-0'>" +
                    "<input class='form-control mr-sm-2' type='search' placeholder='Buscar' aria-label='Search'>" +
                    "<button type='button' class='btn btn-danger'>Buscar</button>" +
                "</form>" +
            "</div>" +
        "</nav>");
}

$(nav);  