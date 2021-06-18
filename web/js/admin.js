/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

var url = "http://localhost:8080/Cine/";

//==============================================================================================================
//================    ROOMS    =================================================================================
//==============================================================================================================

var salas = new Array();
var sala = { filas: 0, columnas:0, nombre:"", id:0 };
var compras1 = new Array();

async function fetchAndListRooms(){
    let request = new Request(url+'api/salas', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    salas = await response.json();
    renderRooms();
}

function renderRooms(){
   var div = $("#body");
   div.html("");
   div.html(
           "<div class='select'>" +
                "<select id='filas'>" +
                    "<option value=''>Filas:</option>" +
                    "<option value='1' type='number'>1</option>" +
                    "<option value='2' type='number'>2</option>" +
                    "<option value='3' type='number'>3</option>" +
                    "<option value='4' type='number'>4</option>" +
                    "<option value='5' type='number'>5</option>" +
                    "<option value='6' type='number'>6</option>" +
                    "<option value='7' type='number'>7</option>" +
                    "<option value='8' type='number'>8</option>" +
                "</select>" +
            "</div>" +
            "<div class='select'>" +
                "<select id='columnas'>" +
                    "<option value=''>Columnas:</option>" +
                    "<option value='1' type='number'>1</option>" +
                    "<option value='2' type='number'>2</option>" +
                    "<option value='3' type='number'>3</option>" +
                    "<option value='4' type='number'>4</option>" +
                    "<option value='5' type='number'>5</option>" +
                    "<option value='6' type='number'>6</option>" +
                    "<option value='7' type='number'>7</option>" +
                    "<option value='8' type='number'>8</option>" +
                "</select>" +
            "</div>" +
            "<div class='input-group mb-3'>" +
                "<div class='input-group-prepend'>" +
                    "<span class='input-group-text' id='basic-addon1'>Nombre de la sala:</span>" +
                "</div>" +
                "<input type='text' class='form-control' placeholder='Sala' aria-label='sala' aria-describedby='basic-addon1' id='nombresala'>" +
            "</div>" +
           "<button type='button' class='btn btn-secondary' id='botonsala'>Agregar sala</button>" +
           "<table class='table table-striped' id='tablasalas'>" +
                "<thead>" +
                    "<tr>" +
                        "<th scope='col'>ID Sala</th>" +
                        "<th scope='col'>Nombre</th>" +
                        "<th scope='col'>Número de butacas</th>" +
                    "</tr>" +
                "</thead>" +
                "<tbody></tbody>" +
            "</table>");
    var tbody = $("#tablasalas tbody");
    salas.forEach(function(sala){
        var tr = $("<tr />");
        tr.html("<td>" + sala.id + "</td>" +
                "<td>" + sala.nombre + "</td>" +
                "<td>" + sala.filas * sala.columnas + "</td>");
        tbody.append(tr);
    });
    $("#addroom").click(renderRooms);
    $("#botonsala").click(addRoom);
}

function validarAddRoom(){
    var error = false;
    $(".select select").removeClass("invalid");
    error |= $("#nombresala").filter( (i,e)=>{ return e.value=='';}).length > 0;
    $("#nombresala").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    error |= !Number.isInteger(Number.parseInt($('#filas').val()));
    if(!Number.isInteger(Number.parseInt($('#filas').val()))){
        Number.isInteger(Number.parseInt($('#filas').addClass("invalid")));
    }
    error |= !Number.isInteger(Number.parseInt($('#columnas').val())); 
    if(!Number.isInteger(Number.parseInt($('#columnas').val()))){
        Number.isInteger(Number.parseInt($('#columnas').addClass("invalid"))); 
    }
    return !error;
}

async function addRoom(){
    sala.filas = Number.parseInt($('#filas').val());
    sala.columnas = Number.parseInt($('#columnas').val());
    sala.nombre = $('#nombresala').val();
    if(!validarAddRoom()) return;
    let request = new Request(url + "api/salas",
                            {method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(sala)});
    const response = await fetch(request);
    if (!response.ok){ return; }
    fetchAndListRooms();
}


//==============================================================================================================
//================    SHOWS    =================================================================================
//==============================================================================================================

var proyecciones = new Array();
var proyeccion = {id:0, sala:null, pelicula:null, fecha:"", precio:0 };

function resetShows(){
    proyeccion = {id:0, sala:null, pelicula:null, fecha:"", precio:0 };
}

async function listShow(){
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
    $("#agregarproyeccion").prop('disabled', false);
}

function renderShow(){
    var div = $("#body");
    div.html("");
    div.html("<button type='button' class='btn btn-secondary' id='botonproyeccion'>Agregar proyección</button>" +
            "<table class='table table-striped' id='tablaproyecciones'>" +
                "<thead>" +
                    "<tr>" +
                        "<th scope='col'>ID</th>" +
                        "<th scope='col'>Película</th>" +
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
                            "<div class='select'>" +
                                "<select id='fecha'>" +
                                    "<option value='Jul 01, 10am'>Jul 01, 10am</option>" +
                                    "<option value='Jul 01, 1pm'>Jul 01, 1pm</option>" +
                                    "<option value='Jul 01, 5pm'>Jul 01, 5pm</option>" +
                                    "<option value='Jul 01, 8pm'>Jul 01, 8pm</option>" +
                                    "<option value='Jul 02, 10am'>Jul 02, 10am</option>" +
                                    "<option value='Jun 30, 3pm'>Jun 30, 3pm</option>" +
                                    "<option value='Jun 28, 11am'>Jun 28, 11am</option>" +
                                    "<option value='Jul 04, 1pm'>Jul 04, 1pm</option>" +
                                    "<option value='Jul 05, 8am'>Jul 05, 8am</option>" +
                                    "<option value='Jun 26, 2pm'>Jun 26, 2pm</option>" +
                                "</select>" +
                            "</div>" +
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
    error |= $('#fecha').val() == null;
    if($('#pelicula').val() === null){
        $('#pelicula').addClass("invalid");
    }
    if($('#salas').val() === null){
        $('#salas').addClass("invalid");
    }
    if($('#fecha').val() === null){
        $('#fecha').addClass("invalid");
    }
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
    $("#agregarproyeccion").prop('disabled', true);
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
//================    MOVIES    ================================================================================
//==============================================================================================================

var peliculas = new Array();
var pelicula ={ id:0, nombre:"", estado:"" };
var mode='A'; //adding

function resetMovies(){
    pelicula = { id:0, nombre:"", estado:"" };
}

function load(){
    pelicula = Object.fromEntries((new FormData($("#formulario").get(0))).entries());       
}

async function listAllMovies(){
    let request = new Request(url+'api/peliculas', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok) {errorMessage(response.status,$("#body #errorDiv"));return;}
    peliculas = await response.json();
    $("#body").html("");
    var div = $("<div />");
    div.html("<button type='button' class='btn btn-secondary' id='botonaddmovie'>Agregar película</button>");
    var div2 = $("<div />", {"id":"movies", class:"grid-container"});
    $("#body").append(div);
    $("#body").append(div2);
    peliculas.forEach((p)=>{listMovie($("#movies"),p);});
    $("#botonaddmovie").click(showIngresoPelis);
}

function listMovie(listado, movie){
    var div = $("<div />", {"class":"father"});
    div.html("<div class='updiv'><img src='"+url+"api/peliculas/"+movie.nombre+"/imagen' ></div>"+
            "<div class='downdiv'>" +  
                "<p>" + movie.nombre + "</p>" +
                "<a href='#' role='button' id='" + movie.id + "'>" + movie.estado + "</a>" +
            "</div>");
    listado.append(div);
    $("#" + movie.id).click(cambiarEstado);
}

async function cambiarEstado(){
    var id = event.target.id;
    pelicula = peliculas.find(function(p){ return p.id == id });
    let request = new Request(url + "api/peliculas/actualizar",
                             {method: 'PUT', headers: { 'Content-Type': 'application/json'},
                              body: JSON.stringify(pelicula)});
    const response = await fetch(request);
    if (!response.ok){ return; }
    fetchAndListMovies();
}

function renderMovies(){
    $("#nombrepeli").val(pelicula.nombre);
    $("input[name='estado']").val([pelicula.estado]);
    $('#regPel').off('click').on('click', registraPeli);
    $("#add-modal #errorDiv").html("");
    $("#add-modal #imagen").val("");        
    $('#add-modal').modal('show');        
}

function loadIngresoPeli(){
    var div = $("#popupmovies");
    div.html("<div class='modal fade' id='add-modal' tabindex='-1' role='dialog'>" + 
            "<div class='modal-dialog' style='width: 400px'>" + 
                "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                        "<div > <button type='button' class='close' data-dismiss='modal'> <span aria-hidden='true'>&times;</span> </button> </div>" +
                    "</div>" +
                    "<form id='formulario'>" +
                    "<div class='modal-body'>" +
                        "<div id='div-regiPeli-msg'>" +
                            "<div id='icon-regiPeli-msg' ></div>" +
                            "<span id='text-regiPeli-msg'>Registrar Película</span>" +
                        "</div>" +
                        "<br>" +
                        "<div class='form-group'>" +
                            "<label for='nombre'>Nombre</label>" +
                            "<input type='text' class='form-control' name='nombre' id='nombrepeli' placeholder='Nombre'>" +
                        "</div>" +
                        "<div class='form-group'>" + 
                            "<label for='estado'>Estado</label>" +
                            "<div class='form-check'>" +
                                "<input class='form-check-input' type='radio' name='estado' id='cartelera' value='en cartelera'>" +
                                "<div id='carte'>En cartelera</div>" +
                            "</div>" +
                            "<div class='form-check form-check-inline'>" +
                                "<input class='form-check-input' type='radio' name='estado' id='bloqueada' value='bloqueada'>" + 
                                "<div id='bloq'>Bloqueada</div>" +
                            "</div>" +
                        "</div>" +                  
                    "</div>" +
                    "</form>" +
                    "<form>" +
                        "<div class='form-group' style='margin-left: 10px; margin-right: 10px;'>" +
                          "<label for='imagen'>Imagen</label>" + 
                          "<input type='file' accept='image/*' class='form-control' name='imagen' id='imagen' placeholder='Imagen'>"+
                        "</div>"+
                    "</form>"+
                    "<div class='modal-footer d-flex justify-content-center'>"+
                        "<div>" +
                            "<input type='button' id='regPel' class='btn btn-primary btn-lg btn-block' value='Agregar'>" +
                        "</div>" +
                    "</div>" +      
                    "<div id='errorDiv' style='width:70%; margin: auto;'></div>" +
                "</div>" +
            "</div>" +              
        "</div>");
}

function validarAddMovie(){
    var error=false;
    $("#formulario input").removeClass("invalid");
    error |= $("#formulario input[type='text']").filter( (i,e)=>{ return e.value=='';}).length>0;        
    $("#formulario input[type='text']").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    error |= $("input[name='estado']:checked").length==0;
    if ( $("input[name='estado']:checked").length==0) 
        $("#formulario input[name='estado']").addClass("invalid");   
    return !error;
}

function showIngresoPelis(){
    resetMovies();
    renderMovies(); 
}

function errorMessage(status,place){  
    var error;
    switch(status){
        case 404: error= "Registro no encontrado"; break;
        case 403: case 405: error = "Película inválida"; break;
        case 406: case 405: error = "Película inválida"; break;
        default: error = "Error interno"; break;
    };            
    place.html('<div class="alert alert-danger fade show">' +
        '<button type="button" class="close" data-dismiss="alert">' +
        '&times;</button><h4 class="alert-heading">Error</h4>'+error+'</div>');
    return;        
}

async function fetchAndListMovies(){
    listAllMovies();
    loadIngresoPeli();
}

async function registraPeli(){
    load();
    if(!validarAddMovie()) return;
    let request = new Request(url + "api/peliculas/agregar",
                            {method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(pelicula)});
    const response = await fetch(request);
    if (!response.ok) {
        errorMessage(response.status,$("#add-modal #errorDiv"));
        return;
    }
    addImagen();
    listAllMovies();
    resetMovies();
    $("#add-modal #errorDiv").html('<div class="alert alert-success fade show">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button><h4 class="alert-heading">Éxito!</h4>'+'Se ha agregado con éxito'+'</div>');
    $("#regPel").prop('disabled', true);
}

function addImagen(){
    var imagenData = new FormData();
    imagenData.append("nombre", pelicula.nombre);
    imagenData.append("imagen", $("#imagen").get(0).files[0]); 
    let request = new Request(url+'api/peliculas/'+pelicula.nombre+"/imagen", {method: 'POST',body: imagenData});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#add-modal #errorDiv"));return;}              
    })();    
  }



//==============================================================================================================
//================    PDF-PURCHASES    =========================================================================
//==============================================================================================================

function renderAllCompras(){
    var div = $("#body").html("");
    div.html("<table class='table table-striped' id='tablaAllCompras'>" +
                "<thead>" +
                    "<tr>" +
                        "<th scope='col'>Proyección/Película</th>" +
                        "<th scope='col'>Fecha/Hora</th>" +
                        "<th scope='col'>Cantidad de butacas</th>" +
                        "<th scope='col'>Precio por butaca</th>" +
                        "<th scope='col'>Total a pagar</th>" +
                        "<th scope='col'>Tiquetes</th>" +
                    "</tr>" +
                "</thead>" +
                "<tbody></tbody>" +
             "</table>");
    var tbody = $("#tablaAllCompras tbody");
    compras1.forEach(function(compra){
        var tr = $("<tr />");
        tr.html("<td>" + compra.proyeccion.pelicula.nombre + "</td>" +
                "<td>" + compra.proyeccion.fecha + "</td>" +
                "<td>" + compra.precio_total / compra.proyeccion.precio + "</td>" +
                "<td>₡" + compra.proyeccion.precio + "</td>" +
                "<td>₡" + compra.precio_total + "</td>" +
                "<td><a href='#' id='" + compra.id + "'>Imprimir tiquetes</a></td>");
        tbody.append(tr);
        $("#" + compra.id).click(printPDF);
    });
}

function printPDF(){
    var id = event.target.id;
    var compra1 = compras1.find(function(c){ return c.id == id });
    var doc = new jsPDF();
    doc.setFont("courier", "bolditalic");
    doc.setFontSize(40);
    doc.setTextColor(255, 0, 0);
    doc.text("CinePlus",105, 30, null, null, "center");
    doc.setFont("times", "normal");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Datos de la compra", 105, 50, null, null, "center");
    doc.setFont("times", "italic");
    doc.text("Cliente: " + compra1.cliente.nombre, 20, 60);
    doc.setFont("times", "italic");
    doc.text("Proyección/Película: " + compra1.proyeccion.pelicula.nombre, 20, 75);
    doc.text("Fecha/Hora: " + compra1.proyeccion.fecha, 20, 90);
    doc.text("Cantidad de butacas: " + compra1.precio_total / compra1.proyeccion.precio, 20, 105);
    doc.text("Precio por butaca: " + compra1.proyeccion.precio + " colones", 20, 120);
    doc.text("Total a pagar: " + compra1.precio_total + " colones", 20, 135);
    doc.save(compra1.cliente.nombre + '_' + compra1.proyeccion.pelicula.nombre + '.pdf');
}

async function fetchAndListAllCompras(){
    let request = new Request(url+'api/compras/', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    compras1 = await response.json();
    renderAllCompras();
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
    $("#addroom").click(fetchAndListRooms);
    $("#addshow").click(fetchAndListShows);
    $("#showticket").click(fetchAndListAllCompras);
    $("#signoff").click(signoff);
}

function loaded(){ 
    loadNav();
    fetchAndListMovies();
    fetchAndListShows();
}

$(loaded); 
