
var movies=[
{"code":111,"name":"Spider Man","imagen": "https://i2.wp.com/hipertextual.com/wp-content/uploads/2019/06/hipertextual-4-trajes-spider-man-lejos-casa-nuevo-trailer-2019196176.jpg?fit=1920%2C1080&ssl=1", "price": 3000,"proyecciones":{"date":["May 28, 11am"],"sala":"A5","occupancy":[{"row":5,"col":3},{"row":5,"col":4}]}},
{"code":222,"name":"Iron Man","imagen": "https://imagenes.20minutos.es/files/image_656_370/uploads/imagenes/2020/03/23/IronMan301.jpg","price": 4000,"proyecciones":{"date":["Jun 05, 3pm"], "sala":"D1","occupancy":[{"row":1,"col":3},{"row":6,"col":4}]}},
{"code":333,"name":"Thor","imagen": "https://lanetaneta.com/wp-content/uploads/2019/03/8-maneras-en-que-Marvel-amp-039-s-Thor.jpg","price": 5000,"proyecciones":{"date":["Jan 22, 1pm"], "sala":"C2","occupancy":[{"row":2,"col":3},{"row":2,"col":4}]}},
{"code":444,"name":"Captain America","imagen": "https://i2.wp.com/wipy.tv/wp-content/uploads/2020/05/retorno-de-captain-america-al-mcu.jpg?fit=1000%2C600&ssl=1","price": 6000,"proyecciones":{"date":["Nov 11, 2:30pm"], "sala":"E8","occupancy":[{"row":4,"col":3},{"row":4,"col":4}]}},
{"code":555,"name":"Doctor Strange","imagen": "https://i2.wp.com/hipertextual.com/wp-content/uploads/2020/09/hipertextual-libro-que-leyendo-stan-lee-su-cameo-doctor-strange-no-es-casual-2020819727.jpg?fit=1600%2C1067&ssl=1","price": 7000,"proyecciones":{"date":["Sep 30, 10am"], "sala":"F5","occupancy":[{"row":3,"col":3},{"row":3,"col":4}]}},
{"code":777,"name":"Black Widow","imagen": "https://www.tonica.la/__export/1600117063114/sites/debate/img/2020/09/14/black-widow-lanzarx-2-nuevos-trailer.jpg_423682103.jpg","price": 8000,"proyecciones":{"date":["Jul 02, 2pm"], "sala":"G4","occupancy":[{"row":1,"col":7},{"row":1,"col":8}]}}
];

//DATOS QUEMADOS, CAMBIAR
function listar(listado, movie){
    var div = $("<div />", {"class":"father"});
    div.html("<div class='updiv'><img src=" + movie.imagen +"></div>"+
            "<div class='downdiv'>" +  
                "<p>" + movie.name + "</p>" +
                "<ul>" +
                    "<li><a href='js/booking.html'>" + movie.proyecciones.date[0] + "/" + movie.proyecciones.sala + "</a></li>" + 
                "</ul>" +
            "</div>");
    listado.append(div);
}

function list(){
    $("#movies").html("");
    movies.forEach(function(m){
        listar($("#movies"), m);
    })
}

function login(){
    $("#add-modal-login").modal("show");
}

function loadLogin(){
    var div = $("#popuplogin");
    div.html("<div class='modal fade' id='add-modal-login' tabindex='-1' role'dialog'>" +
                "<div class='modal-dialog' style='width: 400px'>" +
                    "<div class='modal-content'>" +
                        "<div class='modal-header'>" +
                            "<div > <button type='button' class='close' data-dismiss='modal'> <span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<form id='formulario'>" +
                            "<div class='modal-body'>" +
                                "<div id='div-login-msg'>" +
                                    "<div id='icon-login-msg'></div>" +
                                    "<span id='text-login-msg'>Iniciar sesión</span>" +
                                "</div>" +
                                "<br>" +
                                "<div class='form-group'>" +
                                    "<label for='cedula'>Cédula</label>" +
                                    "<input type='text' class='form-control' name='cedula' id='cedula' placeholder='Cédula'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='contra'>Contraseña</label>" +
                                    "<input type='password' class='form-control' name='contra' id='contra' placeholder='Contraseña'>" +
                                "</div>" +
                            "</div>" +
                        "</form>" +
                        "<div class='modal-footer d-flex justify-content-center'>" +
                            "<div>" +
                                "<input type='button' id='aplicar' class='btn btn-primary btn-lg btn-block' value='Aplicar'>" +
                            "</div>" +
                        "</div>" +
                        "<div id='errorDiv' style='width:70%; margin: auto;'></div>" +
                    "</div>" +
                "</div>" +
            "</div>");
}

function checkin(){
    $("#add-modal-checkin").modal("show");
}

function loadCheckin(){
    var div = $("#popupcheckin");
    div.html("<div class='modal fade' id='add-modal-checkin' tabindex='-1' role'dialog'>" +
                "<div class='modal-dialog' style='width: 400px'>" +
                    "<div class='modal-content'>" +
                        "<div class='modal-header'>" +
                            "<div > <button type='button' class='close' data-dismiss='modal'> <span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<form id='formulario'>" +
                            "<div class='modal-body'>" +
                                "<div id='div-login-msg'>" +
                                    "<div id='icon-login-msg'></div>" +
                                    "<span id='text-login-msg'>Registrarse</span>" +
                                "</div>" +
                                "<br>" +
                                "<div class='form-group'>" +
                                    "<label for='nombre'>Cédula</label>" +
                                    "<input type='text' class='form-control' name='nombre' id='nombre' placeholder='Nombre'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='cedula'>Cédula</label>" +
                                    "<input type='text' class='form-control' name='cedula' id='nombre' placeholder='Cedula'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='contra1'>Contraseña</label>" +
                                    "<input type='password' class='form-control' name='contra1' id='contra1' placeholder='Contraseña'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='contra2'>Contraseña</label>" +
                                    "<input type='password' class='form-control' name='contra2' id='contra2' placeholder='Verifique su contraseña'>" +
                                "</div>" +
                            "</div>" +
                        "</form>" +
                        "<div class='modal-footer d-flex justify-content-center'>" +
                            "<div>" +
                                "<input type='button' id='aplicar' class='btn btn-primary btn-lg btn-block' value='Aplicar'>" +
                            "</div>" +
                        "</div>" +
                        "<div id='errorDiv' style='width:70%; margin: auto;'></div>" +
                    "</div>" +
                "</div>" +
            "</div>");
}

function fetchAndList(){
    list();
    loadLogin();
    loadCheckin();
}

function loaded(){
    fetchAndList();
    $("#login").click(login);
    $("#checkin").click(checkin);
}


$(loaded);  