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

async function listButacas(){
    let request = new Request(url+'api/butacas', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    butacas = await response.json();
    renderButacas();
}

function renderButacas(){
   var div = $("#popupbutacas");
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
                "<td>" + sala.butacas.length + "</td>");
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
    listRooms();
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