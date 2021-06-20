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

var peli;
var proy;
var butaca = { fila: 0, columna:0, compra:null };
var compra = { cliente:null, proyeccion:null, precio_total:0, butacas:null };
var butacas = new Array();
var compras = new Array();
var peliculas = new Array();

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
            li.html("<a href='#' role='button' class='comprar' id='" + proy.id +"'>" + proy.fecha + "</a>");
            $("#" + peli.id + ".downdiv ul").append(li);
        }); 
    });
    $('.comprar').click(showCompra);
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
            li.html("<a href='#' role='button' class='comprar' id='" + proy.id +"'>" + proy.fecha + "</a>");
            $("#" + peli.id + ".downdiv ul").append(li);
        }); 
    });
    $('.comprar').click(showCompra);
}

function resetButaca(){
    butaca = { fila: 0, columna:0, compra:null };
}

function resetButacas(){
    butacas = new Array();
}

function showCompra(){
    var n = event.target.id;
    peliculas.forEach(function(pel){
        pel.proyecciones.forEach(function(pro){
            if(pro.id == n){ 
                peli = pel;
                proy = pro;
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
    descr.html(peli.nombre + " - " + proy.fecha + " / "+ proy.sala.nombre);
    peliSala.append(descr);
    var pelIma = $("#imagenPro");
    var foto = $("<img />", { "src":url+"api/peliculas/"+peli.nombre+"/imagen" });
    pelIma.append(foto);
    var proyePrecio = $("#precioPro");
    var pre = $("<p />");
    pre.html("Precio = ₡" + proy.precio);
    proyePrecio.append(pre);
    var rows = $("#allRows");
    var asiento;
    var comprasProy = new Array();
    compras.forEach(function(c){
        if(c.proyeccion.id === proy.id){
            comprasProy.push(c);
        } 
    });
    for(var i = 0; i < proy.sala.filas; i++){
        var row = $("<div />", { "class": "row", "id" : i });
        for(var j = 0; j < proy.sala.columnas; j++){
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
            var price = proy.precio;
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
    for(let i = 0; i < proy.sala.filas; i++){
        for(let j = 0; j < proy.sala.columnas; j++){
            var asiento = $("#" + i + ".row > #" + j + ".seat");
            if(asiento.attr("class") == "seat selected"){
                butaca.columna = j;
                butaca.fila = i;
                butacas.push(butaca);
                resetButaca();
            }
        }
    }
}

async function comprar(){
    comprarButacas();
    compra.precio_total = Number.parseInt($("#total").text());
    compra.proyeccion = proy;
    compra.butacas = butacas;
    compra.cliente = JSON.parse(sessionStorage.getItem('user'));
    if(!validarCompra()){
        $("#add-modal-butacas #errorDiv").html('<div class="alert alert-danger fade show">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button><h4 class="alert-heading">Error!</h4>'+'Ha ocurrido un error!'+'</div>'); 
        return;
    }
    let request = new Request(url + "api/compras",
                            {method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(compra)});
    const response = await fetch(request);
    if (!response.ok) {
        return;
    }
    resetButacas();
    recuperarCompras();
    $("#add-modal-butacas #errorDiv").html('<div class="alert alert-success fade show">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button><h4 class="alert-heading">Éxito!</h4>'+'Se ha realizado su compra'+'</div>'); 
    $("#agregarCompra").prop('disabled', true);
}

function validarCompra(){
    var error = false;
    var seleccionado = false;
    for(let i = 0; i < proy.sala.filas; i++){
        for(let j = 0; j < proy.sala.columnas; j++){
            var asiento = $("#" + i + ".row > #" + j + ".seat");
            if(asiento.attr("class") == "seat selected"){
                seleccionado = true;
            }
        }
    }
    if(!seleccionado) error = true;
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

function renderCompras(){
    var div = $("#body").html("");
    div.html("<table class='table table-striped' id='tablacompras'>" +
                "<thead>" +
                    "<tr>" +
                        "<th scope='col'>Proyección/Película</th>" +
                        "<th scope='col'>Fecha/Hora</th>" +
                        "<th scope='col'>Cantidad de butacas</th>" +
                        "<th scope='col'>Precio por butaca</th>" +
                        "<th scope='col'>Total a pagar</th>" +
                    "</tr>" +
                "</thead>" +
                "<tbody></tbody>" +
             "</table>");
    var tbody = $("#tablacompras tbody");
    compras.forEach(function(compra){
        var tr = $("<tr />");
        tr.html("<td>" + compra.proyeccion.pelicula.nombre + "</td>" +
                "<td>" + compra.proyeccion.fecha + "</td>" +
                "<td>" + compra.precio_total / compra.proyeccion.precio + "</td>" +
                "<td>₡" + compra.proyeccion.precio + "</td>" +
                "<td>₡" + compra.precio_total + "</td>");
        tbody.append(tr);
    });
}

function printPDF(){
    if(!validarCompra()){
        return;
    }
    var cliente = JSON.parse(sessionStorage.getItem('user'));
    var nomPro = peli.nombre;
    var fec = proy.fecha;
    var cant = Number.parseInt($("#count").text());
    var pre = proy.precio;
    var tot = Number.parseInt($("#total").text());
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
    doc.text("Cliente: " + cliente.nombre, 20, 60);
    doc.setFont("times", "italic");
    doc.text("Proyección/Película: " + nomPro, 20, 75);
    doc.text("Fecha/Hora: " + fec, 20, 90);
    doc.text("Cantidad de butacas: " + cant, 20, 105);
    doc.text("Precio por butaca: " + pre + " colones", 20, 120);
    doc.text("Total a pagar: " + tot + " colones", 20, 135);
    doc.save(cliente.nombre + '_' + nomPro + '.pdf');
}

async function fetchAndListCompras(){
    var usuario = JSON.parse(sessionStorage.getItem('user'));
    let request = new Request(url+'api/compras/' + usuario.id, {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    compras = await response.json();
    renderCompras();
}

function fetchAndListShows(){
    recuperarCompras();
    listAllShows();
}


//==============================================================================================================
//==============================================================================================================
//==============================================================================================================

async function signoff(){
    let request = new Request(url+'api/sesiones/', {method: 'DELETE', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    sessionStorage.removeItem("user");
    location.href = "/Cine";
}

function loadNav(){
    $("#purchases").click(fetchAndListCompras);
    $("#signoff").click(signoff);
    $("#searchButton").click(search);
    var cliente = JSON.parse(sessionStorage.getItem('user'));
    $("#signoff").html("Cerrar Sesión (" + cliente.nombre + ")");
}

function loaded(){
    loadNav();
    fetchAndListShows();
}

$(loaded);
