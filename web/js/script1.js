/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

var url = "http://localhost:8080/Cine/";

//==============================================================================================================
//================   MOVIES/SHOWS  =============================================================================
//==============================================================================================================

var peliculas = new Array();
var proyeccion = { id:0, sala:null, pelicula:null, fecha:"", precio:0 };

async function listAllShows(){
    let request = new Request(url+'api/peliculas/cartelera', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok) {errorMessage(response.status,$("#body #errorDiv"));return;}
    peliculas = await response.json();
    $("#body").html("");
    var div = $("<div />", {"id":"movies", class:"grid-container"});
    $("#body").append(div);
    peliculas.forEach(function(peli){
        var div2 = $("<div />", {"class":"father"});
        div2.html("<div class='updiv'><img src='"+url+"api/peliculas/"+peli.nombre+"/imagen' ></div>"+
                 "<div class='downdiv'>" +  
                    "<p>" + peli.nombre + "</p>" +
                    "<ul></ul>" +
                 "</div>");
        div.append(div2); 
        peli.proyecciones.forEach(function(proy){
            var li = $("<li />");
            li.html("<a href='#' role='button' id='comprar'>" + proy.fecha + "</a>");
            $(".downdiv ul").append(li);
            $('#comprar').click(showLogin());
        });
    });
}

//==============================================================================================================
//================   USERS     =================================================================================
//==============================================================================================================

var usuarios = new Array();
var usuario = { id:"", clave:"", rol:"", nombre:"", numTarjeta:"" };

function reset(){
    usuario = { id:"", clave:"", rol:"", nombre:"", numTarjeta:"" }; 
}

function login(){
    usuario = Object.fromEntries( (new FormData($("#formulario1").get(0))).entries());       
    if(!validarLogin()) return;
    let request = new Request(url + "api/sesiones/comprobar",
                            {method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(usuario)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status,$("#add-modal-login #errorDiv1"));
            return;
        }
        usuario = await response.json();
        sessionStorage.setItem("user", JSON.stringify(usuario));
        if(usuario.rol === "administrador"){
            location.href = "/Cine/presentation/administrador.html";
        }
        else if(usuario.rol === "cliente"){
            location.href = "/Cine/presentation/cliente.html";
        }
    })();
}

function getUser(cedula){
    let request = new Request(url + "api/usuarios/" + cedula,
                            {method:'GET',
                            headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status,$("#buscarDiv #errorDiv1"));
            return;
        }
        return await response.json();
    })();
}

function renderLogin(){
    $("#cedula").val(usuario.cedula);
    $("#password").val(usuario.clave);
    $('#aplicar1').on('click', login);   
    $("#add-modal-login #errorDiv1").html("");     
    $('#add-modal-login').modal('show');        
}

function renderCheckin(){
    $("#nombre").val(usuario.nombre);
    $("#cedula").val(usuario.cedula);
    $("#password").val(usuario.clave);
    $('#aplicar2').on('click', checkin);
    $("#add-modal-checkin #errorDiv2").html("");     
    $('#add-modal-checkin').modal('show');
}

function validarLogin(){
    var error = false;
    $("#formulario1 input").removeClass("invalid");
    error |= $("#formulario1 input[type='text']").filter( (i,e)=>{ return e.value=='';}).length > 0;        
    $("#formulario1 input[type='text']").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    error |= $("#formulario1 input[type='password']").filter((i,e)=>{ return e.value=='';}).length > 0;
    $("#formulario1 input[type='password']").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    return !error;
  }
  
  function validarCheckin(){
    var error = false;
    $("#formulario2 input").removeClass("invalid");
    error |= $("#formulario2 input[type='text']").filter( (i,e)=>{ return e.value=='';}).length > 0;       
    $("#formulario2 input[type='text']").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    error |= $("#formulario2 input[type='password']").filter( (i,e)=>{ return e.value=='';}).length > 0;       
    $("#formulario2 input[type='password']").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");  
    error |= ($("#formulario2 input[id='contra2']").val() != $("#formulario2 input[id='contraverificar2']").val());
    if($("#formulario2 input[id='contra2']").val() != $("#formulario2 input[id='contraverificar2']").val()){
        $("#formulario2 input[id='contra2']").addClass("invalid");
        $("#formulario2 input[id='contraverificar2']").addClass("invalid");
    }
    return !error;
  }

/*
function list(){
    $("#movies").html("");
    movies.forEach(function(m){
        listar($("#movies"), m);
    })
}
*/

function showLogin(){
    reset();
    renderLogin();
}

function loadLogin(){
    var div = $("#popuplogin");
    div.html("<div class='modal fade' id='add-modal-login' tabindex='-1' role'dialog'>" +
                "<div class='modal-dialog' style='width: 400px'>" +
                    "<div class='modal-content'>" +
                        "<div class='modal-header'>" +
                            "<div > <button type='button' class='close' data-dismiss='modal'> <span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<form id='formulario1'>" +
                            "<div class='modal-body'>" +
                                "<div id='div-login-msg'>" +
                                    "<div id='icon-login-msg'></div>" +
                                    "<span id='text-login-msg'>Iniciar sesión</span>" +
                                "</div>" +
                                "<br>" +
                                "<div class='form-group'>" +
                                    "<label for='cedula'>Cédula</label>" +
                                    "<input type='text' class='form-control' name='id' id='cedula1' placeholder='Cédula'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='contra'>Contraseña</label>" +
                                    "<input type='password' class='form-control' name='clave' id='contra1' placeholder='Contraseña'>" +
                                "</div>" +
                            "</div>" +
                        "</form>" +
                        "<div class='modal-footer d-flex justify-content-center'>" +
                            "<div>" +
                                "<input type='button' id='aplicar1' class='btn btn-primary btn-lg btn-block' value='Aplicar'>" +
                            "</div>" +
                        "</div>" +
                        "<div id='errorDiv1' style='width:70%; margin: auto;'></div>" +
                    "</div>" +
                "</div>" +
            "</div>");
}

function showCheckin(){
    reset();
    renderCheckin();
}

function loadCheckin(){
    var div = $("#popupcheckin");
    div.html("<div class='modal fade' id='add-modal-checkin' tabindex='-1' role'dialog'>" +
                "<div class='modal-dialog' style='width: 400px'>" +
                    "<div class='modal-content'>" +
                        "<div class='modal-header'>" +
                            "<div > <button type='button' class='close' data-dismiss='modal'> <span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<form id='formulario2'>" +
                            "<div class='modal-body'>" +
                                "<div id='div-login-msg'>" +
                                    "<div id='icon-login-msg'></div>" +
                                    "<span id='text-login-msg'>Registrarse</span>" +
                                "</div>" +
                                "<br>" +
                                "<div class='form-group'>" +
                                    "<label for='nombre'>Nombre</label>" +
                                    "<input type='text' class='form-control' name='nombre' id='nombre2' placeholder='Nombre'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='cedula'>Cédula</label>" +
                                    "<input type='text' class='form-control' name='cedula' id='cedula2' placeholder='Cédula'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='contra1'>Contraseña</label>" +
                                    "<input type='password' class='form-control' name='clave' id='contra2' placeholder='Contraseña'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='contra2'>Contraseña</label>" +
                                    "<input type='password' class='form-control' name='claveverificar' id='contraverificar2' placeholder='Verifique su contraseña'>" +
                                "</div>" +
                            "</div>" +
                        "</form>" +
                        "<div class='modal-footer d-flex justify-content-center'>" +
                            "<div>" +
                                "<input type='button' id='aplicar2' class='btn btn-primary btn-lg btn-block' value='Aplicar'>" +
                            "</div>" +
                        "</div>" +
                        "<div id='errorDiv2' style='width:70%; margin: auto;'></div>" +
                    "</div>" +
                "</div>" +
            "</div>");
}

function signoff(){
    sessionStorage.removeItem("user");
    location.href = "/Cine";
}

function checkin(){
    usuario.nombre = $('#formulario2 input[id=nombre2]').val();
    usuario.clave = $('#formulario2 input[id=contra2]').val();
    usuario.id = $('#formulario2 input[id=cedula2]').val();
    usuario.rol = "cliente";
    if(!validarCheckin()) return;
    let request = new Request(url + "api/sesiones/registrarse",
                            {method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(usuario)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status,$("#add-modal-checkin #errorDiv2"));
            return;
        }
        reset();
        $("#add-modal-checkin #errorDiv2").html('<div class="alert alert-success fade show">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button><h4 class="alert-heading">Éxito!</h4>'+'Se ha registrado con éxito'+'</div>');               
    })();
}

function errorMessage(status,place){  
    var error;
    switch(status){
        case 404: error= "Registro no encontrado"; break;
        case 403: case 405: error = "Usuario no autorizado"; break;
        case 406: case 405: error = "Error de autenticación"; break;
        default: error = "Error interno"; break;
    };            
    place.html('<div class="alert alert-danger fade show">' +
        '<button type="button" class="close" data-dismiss="alert">' +
        '&times;</button><h4 class="alert-heading">Error</h4>'+error+'</div>');
    return;        
} 

//==============================================================================================================
//==============================================================================================================
//==============================================================================================================

function loadPopups(){
    loadLogin();
    loadCheckin();
}

function loaded(){
    loadPopups();
    listAllShows();
    $("#login").click(showLogin);
    $("#checkin").click(showCheckin);
    $("#signoff").click(signoff);
}

$(loaded);  
