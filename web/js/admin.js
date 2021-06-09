/*
UNIVERSIDAD NACIONAL DE COSTA RICA
EIF-209  -  PROGRAMACIÓN IV
PROYECTO II
ESTUDIANTE: JOEL ZAMORA Y DIEGO JIMÉNEZ
PROFESOR: JOSE SÁNCHEZ SALAZAR
*/

var salas = new Array();

var url = "http://localhost:8080/Cine/";

async function listRooms(){
    let request = new Request(url+'api/salas', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    salas = await response.json(); 
    showAddRoom();
}

function showAddRoom(){
   var div = $("#body");
   div.html("");
   div.html("<div id='botones'>" +
                "<div class='dropdown'>" +
                    "<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                        "Columnas" +
                    "</button>" +
                    "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>" +
                        "<a class='dropdown-item' href='#'>1</a>" +
                        "<a class='dropdown-item' href='#'>2</a>" +
                        "<a class='dropdown-item' href'#'>3</a>" +
                        "<a class='dropdown-item' href'#'>4</a>" +
                        "<a class='dropdown-item' href'#'>5</a>" +
                        "<a class='dropdown-item' href'#'>6</a>" +
                        "<a class='dropdown-item' href'#'>7</a>" +
                        "<a class='dropdown-item' href'#'>8</a>" +
                    "</div>" +
                "</div>" +
                "<div class='dropdown'>" +
                     "<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                         "Filas" +
                     "</button>" +
                     "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>" +
                         "<a class='dropdown-item' href='#'>1</a>" +
                         "<a class='dropdown-item' href='#'>2</a>" +
                         "<a class='dropdown-item' href'#'>3</a>" +
                         "<a class='dropdown-item' href'#'>4</a>" +
                         "<a class='dropdown-item' href'#'>5</a>" +
                         "<a class='dropdown-item' href'#'>6</a>" +
                         "<a class='dropdown-item' href'#'>7</a>" +
                         "<a class='dropdown-item' href'#'>8</a>" +
                     "</div>" +
                "</div>" +
                "<button type='button' class='btn btn-secondary btn-lg' id='botonsala'>Agregar sala</button>" +
           "</div>" +
           "<table class='table table-striped' id='tablasalas'>" +
                "<thead>" +
                    "<tr>" +
                        "<th scope='col'>ID Sala</th>" +
                        "<th scope='col'>Número de butacas</th>" +
                    "</tr>" +
                "</thead>" +
                "<tbody></tbody>" +
            "</table>");
    var tbody = $("#tablasalas tbody");
    salas.forEach(function(sala){
        var tr = $("<tr />");
        tr.html("<td>" + sala.id + "</td>" +
                "<td>" + sala.butacas.length + "</td>");
        tbody.append(tr);
    })
}

function loaded(){
    listRooms();
    $("#addroom").click(showAddRoom);
}

$(loaded); 