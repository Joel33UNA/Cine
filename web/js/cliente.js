/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

//==============================================================================================================
//================    COMPRA    ===============================================================================
//==============================================================================================================

var url = "http://localhost:8080/Cine/";

var butacas = new Array();
var butaca = { fila: 0, columna:0, sala:null };
var proyeccion = { id:0, sala:null, pelicula:null, fecha:"", precio:0 };
var compra = {id:0, cliente: null, proyeccion: null, total: 0};

function resetCompra(){
    butaca = {id:0, cliente: null, proyeccion: null, total: 0};
}

async function recuperarCompra(){
    let request = new Request(url+'api/compras'+proyeccion.id, {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    compra = await response.json();
    renderButacas();
}

async function loadInfoCompra(){
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
                                        "<div id='seat' class='seat disponible'></div>"+
                                            "<small class='status' style='font-size: 1em;'>Disponible</small>"+
                                    "</li>"+ 
                                    "<li>"+
                                        "<div id='seat' class='seat seleccionado'></div>"+
                                            "<small class='status' style='font-size: 1em;'>Seleccionado</small>"+
                                    "</li>"+ 
                                    "<li>"+
                                        "<div id='seat' class='seat ocupado'></div>"+
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
                                "<p class='text' style='font-size: 1em;margin:0px 0px 15px 0px'>Usted ha seleccionado "+
                                    "<span id='count'>0</span> butacas por el precio de"+
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
    var asiento;
    var row;
    for(var i = 0; i < proyeccion.sala.filas; i++){
        row = $("<div />", { "class": "row" });
        for(var j = 0; j < proyeccion.sala.columnas; j++){
            if(compra.proyeccion.sala.id == butaca.sala.id){
                asiento = $("<div />", {"class": "seat ocupado"});
            }else{
                asiento = $("<div />", {"class": "seat disponible"});
            }
            row.append(asiento);
        }
    rows.append(row);
    }
    var count=0;
    var seats=document.getElementsByClassName("seat");
    for(var i=0;i<seats.length;i++){
        var item=seats[i];
        item.addEventListener("click",(event)=>{
        var price = proyeccion.precio;
        if (!event.target.classList.contains('ocupado')){
            count++;
            var total=count*price;
            var estado;
                        // PREGUNTAR!!!
            if(event.target.classList.contains("seleccionado")){
                estado = "disponible";
            }else{
                estado = "seleccionado";
            }
            event.target.classList.add(estado);
            document.getElementById("count").innerText=count;
            document.getElementById("total").innerText=total;
        }
        })
    }
}

function validarAddCompra(){
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

async function addCompra(){    
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

function showIngresoCompra(){
    resetCompra();
    renderCompra();
}

async function fetchAndListCompra(){
    listCompras();
    loadInfoCompra();
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
    fetchAndListCompra();
}

$(loaded);


//==============================================================================================================
//================    COMPRA    ===============================================================================
//==============================================================================================================