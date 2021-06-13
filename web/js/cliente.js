/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

var url = "http://localhost:8080/Cine/";

//==============================================================================================================
//================    BUTACAS    ===============================================================================
//==============================================================================================================
/*
var butacas = new Array();
var butaca = { fila: 0, columna:0, sala:null };
var proyeccion = { id:0, sala:null, pelicula:null, fecha:"", precio:0 };

function resetButacas(){
    proyeccion = {id:0, sala:null, pelicula:null, fecha:"", precio:0 };
}

async function listButacas(){
    let request = new Request(url+'api/proyecciones', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    proyecciones = await response.json();
    renderShow();
}

function renderShows(){
    $("#fecha").val(proyeccion.fecha);
    $("#precio").val(proyeccion.precio);
    $('#agregarproyeccion').off('click').on('click', addShow);
    $("#add-modal-show #errorDiv").html("");       
    $('#add-modal-show').modal('show');
}

function renderShow(){
    var div = $("#body");
    div.html("");
    div.html("<button type='button' class='btn btn-secondary' id='botonproyeccion'>Agregar proyección</button>" +
            "<table class='table table-striped' id='tablaproyecciones'>" +
                "<thead>" +
                    "<tr>" +
                        "<th scope='col'>ID</th>" +
                        "<th scope='col'>Nombre</th>" +
                        "<th scope='col'>Sala</th>" +
                        "<th scope='col'>Precio</th>" +
                        "<th scope='col'>Fecha</th>" +
                    "</tr>" +
                "</thead>" +
                "<tbody></tbody>" +
             "</table>");
    var tbody = $("#tablaproyecciones tbody");
    proyecciones.forEach(function(proyeccion){
        var tr = $("<tr />");
        tr.html("<td>" + proyeccion.id + "</td>" +
                "<td>" + proyeccion.pelicula.nombre + "</td>" +
                "<td>" + proyeccion.sala.nombre + "</td>" +
                "<td>" + proyeccion.precio + "</td>" +
                "<td>" + proyeccion.fecha + "</td>");
        tbody.append(tr);
    });
    $("#botonproyeccion").click(showIngresoProyecciones);
}

async function loadIngresoProyec(){
    let request = new Request(url+'api/peliculas', {method: 'GET', headers: { }});
    let response = await fetch(request);
    if (!response.ok) {errorMessage(response.status,$("#body #errorDiv"));return;}
    peliculas = await response.json();
    request = new Request(url+'api/salas', {method: 'GET', headers: { }});
    response = await fetch(request);
    if (!response.ok){ return; }
    salas = await response.json();
    var div = $("#popupshows");
    div.html("<div class='modal fade' id='add-modal-show' tabindex='-1' role='dialog'>" + 
            "<div class='modal-dialog' style='width: 400px'>" + 
                "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                        "<div > <button type='button' class='close' data-dismiss='modal'> <span aria-hidden='true'>&times;</span> </button> </div>" +
                    "</div>" +
                    "<form id='formularioshow'>" +
                    "<div class='modal-body'>" +
                        "<div id='div-regiProyec-msg'>" +
                            "<div id='icon-regiProyec-msg' ></div>" +
                            "<span id='text-regiProyec-msg'>Registrar Proyección</span>" +
                        "</div>" +
                        "<br>" +
                        "<div class='form-group'>" +
                            "<label for='sala'>Sala</label>" +
                            "<div class='select'>" +
                                "<select id='salas'></select>" +
                            "</div>" +
                        "<div class='form-group'>" + 
                            "<label for='pelicula'>Película</label>" +
                            "<div class='select'>" +
                                "<select id='pelicula'></select>" +
                            "</div>" +
                        "</div>" +
                        "<div class='form-group'>" + 
                            "<label for='fecha'>Fecha</label>" +
                            "<input type='text' class='form-control' placeholder='Fecha' aria-label='fecha' aria-describedby='basic-addon1' id='fecha'>" +
                        "</div>" +
                        "<div class='form-group'>" + 
                            "<label for='precio'>Precio</label>" +
                            "<input type='text' class='form-control' placeholder='Precio' aria-label='precio' aria-describedby='basic-addon1' id='precio'>" +
                        "</div>" +
                    "</div>" +
                    "</form>" +
                    "<div class='modal-footer d-flex justify-content-center'>"+
                        "<div>" +
                            "<input type='button' id='agregarproyeccion' class='btn btn-primary btn-lg btn-block' value='Agregar'>" +
                        "</div>" +
                    "</div>" +      
                    "<div id='errorDiv2' style='width:70%; margin: auto;'></div>" +
                "</div>" +
            "</div>" +              
        "</div>");
    var selectsalas = $("#salas");
    var selectpeliculas = $("#pelicula");
    salas.forEach(function(sala){
        var option = $("<option />", { "value":sala.id });
        option.html(sala.nombre);
        selectsalas.append(option);
    });
    peliculas.forEach(function(pelicula){
        var option = $("<option />", { "value":pelicula.id });
        option.html(pelicula.nombre);
        selectpeliculas.append(option);
    });
}

function validarAddShow(){
    var error = false;
    $("#formulario2 input").removeClass("invalid");
    error |= $("#formulario2 input[type='text']").filter( (i,e)=>{ return e.value=='';}).length>0;        
    $("#formulario2 input[type='text']").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    error |= !Number.isInteger(Number.parseInt($('#precio').val()));
    if(!Number.isInteger(Number.parseInt($('#precio').val()))){
       Number.isInteger(Number.parseInt($('#precio').addClass("invalid")));
    }
    return !error;
}

async function addShow(){    
    proyeccion.sala = salas.find(function(s){return(s.id==$("#salas").val())});
    proyeccion.pelicula = peliculas.find(function(p){return(p.id==$('#pelicula').val())});
    proyeccion.fecha = $('#fecha').val();
    proyeccion.precio = Number.parseInt($('#precio').val());
    if(!validarAddShow()) return;
    let request = new Request(url + "api/proyecciones",
                            {method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(proyeccion)});
    const response = await fetch(request);
    if (!response.ok){ return; }
    listShow();
}

function showIngresoProyecciones(){
    resetShows();
    renderShows();
}

async function fetchAndListShows(){
    listShow();
    loadIngresoProyec();
}


//==============================================================================================================
//==============================================================================================================
//==============================================================================================================

function signoff(){
    sessionStorage.removeItem("user");
    location.href = "/Cine";
}

function loadNav(){
    $("#addmovie").click(fetchAndListMovies);
    $("#addroom").click(listRooms);
    $("#addshow").click(fetchAndListShows);
    $("#signoff").click(signoff);
}

function loaded(){ //async00
    loadNav();
    fetchAndListMovies();
    fetchAndListShows();
}

$(loaded);
*/