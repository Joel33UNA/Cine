/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

var salas = new Array();
var sala = { filas: 0, columnas:0, nombre:"" };

var peliculas = new Array();
var pelicula ={id:0,nombre:"",estado:"",precio:0};
var mode='A'; //adding

var url = "http://localhost:8080/Cine/";

function resetMovies(){
    pelicula = { id:0, nombre:"", precio:0, estado:""}; 
}

function load(){
    pelicula = Object.fromEntries((new FormData($("#formulario").get(0))).entries());       
}

async function listRooms(){
    let request = new Request(url+'api/salas', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    salas = await response.json();
    renderRooms();
}

function listMovies(){
    $("#body").html("");
    //var divPel = $("<div />", {"id":"movies"});
    peliculas.forEach((p)=>{listarMovies($("#body"),p);});	
}  
  
function listarMovies(listado, movie){
    var div = $("<div />", {"class":"father"});
    div.html("<div class='updiv'><img src='"+url+"api/peliculas/"+movie.nombre+"/imagen' ></div>"+
            "<div class='downdiv'>" +  
                "<p>" + movie.nombre + "</p>" +
            "</div>");
    listado.append(div);
}

function renderMovies(){
    $("#nombre").val(pelicula.nombre);
    $("#precio").val(pelicula.precio);
    $("input[name='estado']").val([pelicula.estado]);
    $('#regPel').off('click').on('click', registraPeli);
    $("#add-modal #errorDiv").html("");
    $("#add-modal #imagen").val("");        
    $('#add-modal').modal('show');        
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
                "<td>" + sala.butacas.length + "</td>");
        tbody.append(tr);
    });
    $("#addroom").click(renderRooms);
    $("#botonsala").click(addRoom);
}

function loadIngresoPeli(){
   var div = $("#body");
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
                            "<input type='text' class='form-control' name='nombre' id='nombre' placeholder='Nombre'>" +
                        "</div>" +
                        "<div class='form-group'>" +
                            "<label for='precio'>Precio</label>" +
                            "<input type='text' class='form-control' name='precio' id='precio' placeholder='Precio'>" +
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

function validarAddMovie(){
    var error=false;
    $("#formulario input").removeClass("invalid");
    error |= $("#formulario input[type='text']").filter( (i,e)=>{ return e.value=='';}).length>0;        
    $("#formulario input[type='text']").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    error |= $("input[name='estado']:checked").length==0;
    if ( $("input[name='estado']:checked").length==0) $("#formulario input[name='estado']").addClass("invalid");
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

function fetchAndList(){
    let request = new Request(url+'api/peliculas', {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#body #errorDiv"));return;}
        peliculas = await response.json();
        listMovies();
        loadIngresoPeli();
    })();
}

function registraPeli(){
    load();
    if(!validarAddMovie()) return;
    let request = new Request(url + "api/peliculas/agregar",
                            {method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(pelicula)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status,$("#add-modal #errorDiv"));
            return;
        }
        addImagen();
        fetchAndList();
        resetMovies();
        $('#add-modal').modal('hide');
    })();
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

//   EL UPDATE CREO QUE SE NECESITA PARA ACTUALIZAR EL ESTADO DE LA PELICULA

/*function update(){
    load();
    if(!validarAddMovie()) return;
    let request = new Request(url+"api/peliculas/actualizar", 
                            {method: 'PUT', 
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(pelicula)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#add-modal #errorDiv"));return;}
        fetchAndList();
        resetMovies();
        $('#add-modal').modal('hide');                
    })();     
  }*/

function signoff(){
    sessionStorage.removeItem("user");
    location.href = "/Cine";
} 

function loaded(){ /* async00*/
    listRooms();
    fetchAndList();
    $("#addmovie").click(showIngresoPelis);
    $("#signoff").click(signoff);
}

$(loaded); 