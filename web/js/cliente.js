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

var butaca = { fila: 0, columna:0, sala:null };
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
                 "<div class='downdiv'>" +  
                    "<p>" + peli.nombre + "</p>" +
                    "<ul></ul>" +
                 "</div>");
        div.append(div2); 
        peli.proyecciones.forEach(function(proy){
            var li = $("<li />");
            li.html("<a href='#' role='button' class='comprar' id='" + proy.id +"'>" + proy.fecha + "</a>");
            $(".downdiv ul").append(li);
        });
    });
    $('.comprar').click(showCompra);
}

function resetCompra(){
    butaca = {id:0, cliente: null, proyeccion: null, total: 0};
}

function showCompra(){
    var n = event.target.id;
    var peli;
    var proy;
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
                                    "<div class='allRows' id='allRows'>"+
                                        /*"<div class='row'>"+
                                            "<div id='seat' class='seat'></div>"+
                                        "</div"+*/
                                    "</div>"+
                                "</div>"+
                                "<p class='text' style='font-size: 1em;margin:0px 0px 15px 0px'>Usted ha seleccionado "+
                                    "<span id='count'>0</span> butacas por el precio de ₡" +
                                    "<span id='total'>0</span>" +
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
        var row = $("<div />", { "class": "row" });
        for(var j = 0; j < proy.sala.columnas; j++){
            if(compras.length === 0){
                asiento = $("<div />", {"class": "seat"});
            }
            else{
                comprasProy.forEach(function(c){
                    if(c.proyeccion.sala.id == sala.id){
                        asiento = $("<div />", {"class": "seat occupied"});
                    }else{
                        asiento = $("<div />", {"class": "seat"});
                    }
                });
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
        var price = proy.precio;
        if (!event.target.classList.contains('occupied')){
            count++;
            var total=count*price;
                        // PREGUNTAR!!!
            if(event.target.classList.contains("selected")){
                event.target.setAttribute("class", "seat");
                count--;
                total -= price;
            }else{
                event.target.setAttribute("class", "seat selected");
            }
            document.getElementById("count").innerText=count;
            document.getElementById("total").innerText=total;
        }
        });
    }
    $('#add-modal-butacas').modal('show');
}

function pintarButacas(){
    
}

/*function list(){
    $("#listado").html("");
    personas.forEach( (p)=>{row($("#listado"),p);});	
  }  
  
  function row(listado,persona){
	var tr =$("<tr />");
	tr.html("<td>"+persona.cedula+"</td>"+
                "<td>"+persona.nombre+"</td>"+
                "<td><img src='images/"+persona.sexo+".png' class='icon' ></td>"+
                "<td><img src='"+url+"api/personas/"+persona.cedula+"/imagen' class='icon_large' ></td>"+                
                "<td id='edit'><img src='images/edit.png'></td>");
        tr.find("#edit").on("click",()=>{edit(persona.cedula);});
	listado.append(tr);           
  }*/

async function recuperarCompras(){
    let request = new Request(url+'api/compras', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    compras = await response.json();
}

function fetchAndListShows(){
    listAllShows();
    recuperarCompras();
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
    fetchAndListShows();
    if(proy = JSON.parse(sessionStorage.getItem("proy"))){
        
    }
}

$(loaded);
