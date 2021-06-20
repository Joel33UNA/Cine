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
var compras = new Array();
var butacas = new Array();
var butaca = { fila: 0, columna:0, compra:null };
var compra = { cliente:null, proyeccion:null, precio_total:0, butacas:null };
var peli;

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
                 "<div class='downdiv' id='" + peli.id +"'>" +  
                    "<p>" + peli.nombre + "</p>" +
                    "<ul></ul>" +
                 "</div>");
        div.append(div2); 
        peli.proyecciones.forEach(function(proy){
            var li = $("<li />");
            li.html("<a href='#' role='button' id='" + proy.id +"' class='comprar'>" + proy.fecha + "</a>");
            $("#" + peli.id + ".downdiv ul").append(li);
        });
    });
    $('.comprar').on("click", showCompra);
}

async function search(){
    if($("#searchInput").filter( (i,e)=>{ return e.value=='';}).length > 0)
        var filtro = "/";
    else 
        var filtro = "/" + $("#searchInput").val() + "/";
    let request = new Request(url+'api/peliculas' + filtro + 'cartelera', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if(!response) return;
    peliculas = await response.json();
    $("#body").html("");
    var div = $("<div />", {"id":"movies", class:"grid-container"});
    $("#body").append(div);
    peliculas.forEach(function(peli){
        var div2 = $("<div />", {"class":"father"});
        div2.html("<div class='updiv'><img src='"+url+"api/peliculas/"+peli.nombre+"/imagen' ></div>"+
                 "<div class='downdiv' id='" + peli.id +"'>" +  
                    "<p>" + peli.nombre + "</p>" +
                    "<ul></ul>" +
                 "</div>");
        div.append(div2); 
        peli.proyecciones.forEach(function(proy){
            var li = $("<li />");
            li.html("<a href='#' role='button' id='" + proy.id +"' class='comprar'>" + proy.fecha + "</a>");
            $("#" + peli.id + ".downdiv ul").append(li);
        });
    });
    $('.comprar').on("click", showCompra);
}



//==============================================================================================================
//================   PURCHASES  =========================================-======================================
//==============================================================================================================



function showCompra(){
    var n = event.target.id;
    peliculas.forEach(function(pel){
        pel.proyecciones.forEach(function(pro){
            if(pro.id == n){ 
                peli = pel;
                proyeccion = pro;
            } 
        });
    });
    
    var div = $("#popupbutacas");
    div.html("");
    div.html("<div class='modal fade' id='add-modal-butacas' tabindex='-1' role='dialog'>" + 
            "<div class='modal-dialog' style='width: 400px'>" + 
                "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                        "<div > <button type='button' class='close' data-dismiss='modal'> <span aria-hidden='true'>&times;</span></button></div>" +
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
                            "</div>" +
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
                                    "<div class='allRows' id='allRows'></div>"+
                                "</div>"+
                                "<p class='text' style='font-size: 1em;margin:0px 0px 15px 0px'>Usted ha seleccionado "+
                                    "<span id='count'>0</span> butacas por el precio de ₡" +
                                    "<span id='total'>0</span>" +
                                "</p>"+
                                "<div class='form-group'>" +
                                    "<label for='cliente'>Identificación</label>" +
                                    "<input type='text' class='form-control' name='cliente' id='idCli' placeholder='Identificación de cliente anónimo'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='tarjeta'>Tarjeta</label>" +
                                    "<input type='text' class='form-control' name='tarjeta' id='tarjeta' placeholder='Número de tarjeta'>" +
                                "</div>" +
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
    $('#text-regiButacas-msg').val(peli.nombre);
    var peliSala = $("#text-regiButacas-msg");
    var descr = $("<h4 />");
    descr.html(peli.nombre + " - " + proyeccion.fecha + " / "+ proyeccion.sala.nombre);
    peliSala.append(descr);
    var pelIma = $("#imagenPro");
    var foto = $("<img />", { "src":url+"api/peliculas/"+peli.nombre+"/imagen" });
    pelIma.append(foto);
    var proyePrecio = $("#precioPro");
    var pre = $("<p />");
    pre.html("Precio = ₡" + proyeccion.precio);
    proyePrecio.append(pre);
    var rows = $("#allRows");
    var asiento;
    var comprasProy = new Array();
    compras.forEach(function(c){
        if(c.proyeccion.id === proyeccion.id){
            comprasProy.push(c);
        } 
    });
    for(var i = 0; i < proyeccion.sala.filas; i++){
        var row = $("<div />", { "class": "row", "id" : i });
        for(var j = 0; j < proyeccion.sala.columnas; j++){
            asiento = $("<div />", {"class": "seat", "id" : j});
            row.append(asiento);
        }
        rows.append(row);
    }
    comprasProy.forEach(function(c){
        c.butacas.forEach(function(b){
           asiento = $("#" + b.fila + ".row > #" + b.columna + ".seat"); 
           asiento.removeClass();
           asiento.addClass("seat occupied");
        });
    });
    
    var count=0;
    var seats=document.getElementsByClassName("seat");
    var total;
    for(var i=0;i<seats.length;i++){
        var item=seats[i];
        item.addEventListener("click",(event)=>{
            var price = proyeccion.precio;
            if (!event.target.classList.contains('occupied')){
                if(event.target.classList.contains("selected")){
                    event.target.setAttribute("class", "seat");
                    count--;
                    total -= price;
                }else{
                    count++;
                    total = count * price;
                    event.target.setAttribute("class", "seat selected");
                }
                document.getElementById("count").innerText=count;
                document.getElementById("total").innerText=total;
            }
        });
    }
    $('#add-modal-butacas').modal('show');
    $("#agregarCompra").click(comprar);
    $("#agregarCompra").click(printPDF);
}

function comprarButacas(){
    for(let i = 0; i < proyeccion.sala.filas; i++){
        for(let j = 0; j < proyeccion.sala.columnas; j++){
            var asiento = $("#" + i + ".row > #" + j + ".seat");
            if(asiento.attr("class") === "seat selected"){
                butaca.columna = j;
                butaca.fila = i;
                butacas.push(butaca);
                resetButaca();
            }
        }
    }
}

function resetButaca(){
    butaca = { fila: 0, columna:0, compra:null };
}

function resetButacas(){
    butacas = new Array();
}

async function comprar(){
    comprarButacas();
    compra.precio_total = Number.parseInt($("#total").text());
    compra.proyeccion = proyeccion;
    compra.butacas = butacas;
    compra.cliente = {id:$("#idCli").val(),clave:"",rol:"",nombre:"Anonimo"};
    if(!validarCompra()){
        $("#add-modal-butacas #errorDiv").html('<div class="alert alert-danger fade show">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button><h4 class="alert-heading">Error!</h4>'+'Ha ocurrido un error!'+'</div>'); 
        return;
    }
    let request = new Request(url + "api/compras/",
                            {method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(compra)});
    const response = await fetch(request);
    if (!response.ok) {
        return;
    }
    resetButacas();
    recuperarCompras(compra.cliente.id);
    $("#add-modal-butacas #errorDiv").html('<div class="alert alert-success fade show">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button><h4 class="alert-heading">Éxito!</h4>'+'Se ha realizado su compra'+'</div>'); 
    $("#agregarCompra").prop('disabled', true);
}

function validarCompra(){
    var error = false;
    var seleccionado = false;
    for(let i = 0; i < proyeccion.sala.filas; i++){
        for(let j = 0; j < proyeccion.sala.columnas; j++){
            var asiento = $("#" + i + ".row > #" + j + ".seat");
            if(asiento.attr("class") == "seat selected"){
                seleccionado = true;
            }
        }
    }
    if(!seleccionado) error = true;
    $("#idCli").removeClass("invalid");
    error |= $("#formularioButacas input[type='text']").filter( (i,e)=>{ return e.value=='';}).length > 0;        
    $("#formularioButacas input[type='text']").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    $("#tarjeta").removeClass("invalid");
    error |= $("#formularioButacas input[type='text']").filter( (i,e)=>{ return e.value=='';}).length > 0;        
    $("#formularioButacas input[type='text']").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    return !error;
}
   

async function recuperarCompras(){
    let request = new Request(url+'api/compras', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    compras = await response.json();
}


function printPDF(){
    if(!validarCompra()){
        return;
    }
    var doc = new jsPDF();
    doc.setFont("courier", "bolditalic");
    doc.setFontSize(40);
    doc.setTextColor(255, 0, 0);
    doc.text("CineProgra",105, 30, null, null, "center");
    doc.setFont("times", "normal");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Datos de la compra", 105, 50, null, null, "center");
    doc.setFont("times", "italic");
    doc.text("Cliente: " + $("#idCli").val() , 20, 60);
    doc.setFont("times", "italic");
    doc.text("Proyección/Película: " + peli.nombre, 20, 75);
    doc.text("Fecha/Hora: " + proyeccion.fecha, 20, 90);
    doc.text("Cantidad de butacas: " + $("#count").text(), 20, 105);
    doc.text("Precio por butaca: " + proyeccion.precio + " colones", 20, 120);
    doc.text("Total a pagar: " + $("#total").text() + " colones", 20, 135);
    doc.save($("#idCli").val() + '_' + peli.nombre + '.pdf');
}


async function fetchAndListCompras(){
    let request = new Request(url+'api/compras/', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    compras = await response.json();
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


function showLogin(){
    reset();
    renderLogin();
}

function loadLogin(){
    var div = $("#popuplogin");
    div.html("<div class='modal fade' id='add-modal-login' tabindex='-1' role='dialog'>" +
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
    $("#aplicar2").prop('disabled', true);
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
    fetchAndListCompras();
    $("#login").click(showLogin);
    $("#checkin").click(showCheckin);
    $("#signoff").click(signoff);
    $("#searchButton").click(search);
}

$(loaded);  
