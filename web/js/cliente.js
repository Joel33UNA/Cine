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

var butacas = new Array();
var butaca = { fila: 0, columna:0, sala:null };
var proyeccion = { id:0, sala:null, pelicula:null, fecha:"", precio:0 };

function resetButacas(){
    butaca = { fila: 0, columna:0, sala:null };
}

async function listButacas(){
    let request = new Request(url+'api/butacas', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    butacas = await response.json();
    renderButacas();
}

function renderButacas(){
    var div = $("#body");
    div.html("");
    div.html("<button type='button' class='btn btn-secondary' id='botonButaca'>Agregar Butaca</button>" +
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
    $("#botonButacas").click(showIngresoButacas);
}

async function loadButacas(){
    let request = new Request(url+'proyecciones'+proyeccion.id, {method: 'GET', headers: { }});
    let response = await fetch(request);
    if (!response.ok) {errorMessage(response.status,$("#body #errorDiv"));return;}
    proyeccion = await response.json();
    var div = $("#popupbutacas");
    div.html("<div class='modal fade' id='add-modal-butacas' tabindex='-1' role='dialog'>" + 
            "<div class='modal-dialog' style='width: 400px'>" + 
                "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                        "<div > <button type='button' class='close' data-dismiss='modal'> <span aria-hidden='true'>&times;</span> </button> </div>" +
                    "</div>" +
                    "<form id='formularioButacas'>" +
                        "<div class='modal-body'>" +
                            "<div id='div-regiButacas-msg'>" +
                                "<span id='text-regiButacas-msg'></span>" +
                            "</div>" +
                            "<br>" +
                            "<div class='form-group'>" +
                                "<div id='imagenPro'></div>" +
                                "<div id='precioPro'></div>" +
                            "<div class='form-group'>" + 
                                "<p>Butacas</p>"+
                                "<ul class='showcase'>"+
                                    "<li>"+
                                        "<div id='seat' class='seat'></div>"+
                                            "<small class='status' style='font-size: 1em;'>Disponible</small>"+
                                    "</li>"+ 
                                    "<li>"+
                                        "<div id='seat' class='seat selected'></div>"+
                                            "<small class='status' style='font-size: 1em;'>Seleccionado</small>"+
                                    "</li>"+ 
                                    "<li>"+
                                        "<div id='seat' class='seat occupied'></div>"+
                                            "<small class='status' style='font-size: 1em;'>Ocupado</small>"+
                                    "</li>"+
                                "</ul>"+
                                "<div class='container'>"+
                                    "<div class='screen'></div>"+
                                    "<div class='allRows' id='allRows'>"+
                                        /*"<div class='row'>"+
                                            "<div id='seat' class='seat'></div>"+
                                        "</div"+*/
                                    "</div>"+
                                "</div>"+
                                "<p class='text' style='font-size: 1em;margin:0px 0px 15px 0px'>"+
                                    "Usted ha seleccionado <span id='count'>0</span> butacas por el precio de"+
                                    "<span id='total'>0</span>"+
                                "</p>"+
                            "</div>" +
                        "</div>" +
                    "</form>" +
                    "<div class='modal-footer d-flex justify-content-center'>"+
                        "<div>" +
                            "<input type='button' id='agregarCompra' class='btn btn-primary btn-lg btn-block' value='Comprar'>"+
                        "</div>" +
                    "</div>" +      
                    "<div id='errorDiv' style='width:70%; margin: auto;'></div>" +
                "</div>" +
            "</div>" +              
        "</div>");

        // PARA HACER ESTO DEBO RECUPERAR ANTES LA LISTA DE BUTACAS DE LA BASE DE DATOS
    var peliSala = $("#text-regiButacas-msg");
    var descr = $("<p />", { "value":proyeccion.pelicula.nombre + " - " + proyeccion.fecha + " / "+ proyeccion.sala.nombre });
    peliSala.append(descr);
    var pelIma = $("#imagenPro");
    var foto = $("<img />", { "src":url+"api/peliculas/"+proyeccion.pelicula.nombre+"/imagen" });
    pelIma.append(foto);
    var proyePrecio = $("#precioPro");
    var pre = $("<p />", { "value":proyeccion.precio });
    proyePrecio.append(pre);
    var rows = $("#allRows");
    for(i = 0; i < proyeccion.sala.filas; i++){
        var row = $("<div />", { "class": "row" });
        for(j = 0; j < proyeccion.sala.columnas; j++){
            
            var asiento = $("<div />", {"class": "seat"});
            row.append(asiento);
        }
        rows.append(row);
    }
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
                            body: JSON.stringify(Butaca)});
    const response = await fetch(request);
    if (!response.ok){ return; }
    listButacas();
}

function showIngresoButacas(){
    resetButacas();
    renderButacas();
}

async function fetchAndListButacas(){
    listButacas();
    loadButacas();
}


//==============================================================================================================
//==============================================================================================================
//==============================================================================================================

function signoff(){
    sessionStorage.removeItem("user");
    location.href = "/Cine";
}

function loadNav(){
    //$("#purchases").click(cargarCompras);
    $("#signoff").click(signoff);
}

function loaded(){ //async00
    loadNav();
    fetchAndListButacas();
}

$(loaded);
