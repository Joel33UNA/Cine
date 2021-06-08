var usuarios = new Array();
var usuario = { id:"", clave:"", rol:"", nombre:"", numTarjeta:"" };

var url = "http://localhost:8080/Cine/";

var movies=[
{"code":111,"name":"Spider Man","imagen": "https://i2.wp.com/hipertextual.com/wp-content/uploads/2019/06/hipertextual-4-trajes-spider-man-lejos-casa-nuevo-trailer-2019196176.jpg?fit=1920%2C1080&ssl=1", "price": 3000,"proyecciones":{"date":["May 28, 11am"],"sala":"A5","occupancy":[{"row":5,"col":3},{"row":5,"col":4}]}},
{"code":222,"name":"Iron Man","imagen": "https://imagenes.20minutos.es/files/image_656_370/uploads/imagenes/2020/03/23/IronMan301.jpg","price": 4000,"proyecciones":{"date":["Jun 05, 3pm"], "sala":"D1","occupancy":[{"row":1,"col":3},{"row":6,"col":4}]}},
{"code":333,"name":"Thor","imagen": "https://lanetaneta.com/wp-content/uploads/2019/03/8-maneras-en-que-Marvel-amp-039-s-Thor.jpg","price": 5000,"proyecciones":{"date":["Jan 22, 1pm"], "sala":"C2","occupancy":[{"row":2,"col":3},{"row":2,"col":4}]}},
{"code":444,"name":"Captain America","imagen": "https://i2.wp.com/wipy.tv/wp-content/uploads/2020/05/retorno-de-captain-america-al-mcu.jpg?fit=1000%2C600&ssl=1","price": 6000,"proyecciones":{"date":["Nov 11, 2:30pm"], "sala":"E8","occupancy":[{"row":4,"col":3},{"row":4,"col":4}]}},
{"code":555,"name":"Doctor Strange","imagen": "https://i2.wp.com/hipertextual.com/wp-content/uploads/2020/09/hipertextual-libro-que-leyendo-stan-lee-su-cameo-doctor-strange-no-es-casual-2020819727.jpg?fit=1600%2C1067&ssl=1","price": 7000,"proyecciones":{"date":["Sep 30, 10am"], "sala":"F5","occupancy":[{"row":3,"col":3},{"row":3,"col":4}]}},
{"code":777,"name":"Black Widow","imagen": "https://www.tonica.la/__export/1600117063114/sites/debate/img/2020/09/14/black-widow-lanzarx-2-nuevos-trailer.jpg_423682103.jpg","price": 8000,"proyecciones":{"date":["Jul 02, 2pm"], "sala":"G4","occupancy":[{"row":1,"col":7},{"row":1,"col":8}]}}
];

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
            location.href = "/Cine";
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
    $('#aplicar2').on('click', login);
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
    error |= $("#formulario2 input[type='text'], formulario input[type='password]").filter( (i,e)=>{ return e.value=='';}).length>0;        
    $("#formulario2 input[type='text'], formulario input[type='password]").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    error |= ($("#formulario2 input[type='password'].contra1") != $("#formulario2 input[type='password'].contra2"));
    if($("#formulario2 input[type='password'].contra2") != $("#formulario2 input[type='password'].contraverificar2")){
        $("#formulario2 input[type='password', id='contra2']").addClass("invalid");
        $("#formulario2 input[type='password', id='contraverificar2']").addClass("invalid");
    }
    return !error;
  }

//DATOS QUEMADOS, CAMBIAR
function listar(listado, movie){
    var div = $("<div />", {"class":"father"});
    div.html("<div class='updiv'><img src=" + movie.imagen +"></div>"+
            "<div class='downdiv'>" +  
                "<p>" + movie.name + "</p>" +
                "<ul>" +
                    "<li><a href='js/booking.html'>" + movie.proyecciones.date[0] + "/" + movie.proyecciones.sala + "</a></li>" + 
                "</ul>" +
            "</div>");
    listado.append(div);
}

function list(){
    $("#movies").html("");
    movies.forEach(function(m){
        listar($("#movies"), m);
    })
}

function showLogin(){
    reset();
    renderLogin()
}

function loadLogin(){
    var div = $("#popuplogin");
    div.html("<div class='modal fade' id='add-modal-login' tabindex='-1' role'dialog'>" +
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
                        "<form id='formulariocheckin'>" +
                            "<div class='modal-body'>" +
                                "<div id='div-login-msg'>" +
                                    "<div id='icon-login-msg'></div>" +
                                    "<span id='text-login-msg'>Registrarse</span>" +
                                "</div>" +
                                "<br>" +
                                "<div class='form-group'>" +
                                    "<label for='nombre'>Cédula</label>" +
                                    "<input type='text' class='form-control' name='nombre' id='nombre2' placeholder='Nombre'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='cedula'>Cédula</label>" +
                                    "<input type='text' class='form-control' name='cedula' id='cedula2' placeholder='Cédula'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='contra1'>Contraseña</label>" +
                                    "<input type='password' class='form-control' name='contra1' id='contra2' placeholder='Contraseña'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='contra2'>Contraseña</label>" +
                                    "<input type='password' class='form-control' name='contra2' id='contraverificar2' placeholder='Verifique su contraseña'>" +
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

function errorMessage(status,place){  
    var error;
    switch(status){
        case 404: error= "Registro no encontrado"; break;
        case 403: case 405: error = "Usuario no autorizado"; break;
        case 406: case 405: error = "Error de autentificación"; break;
        default: error = "Error interno"; break;
    };            
    place.html('<div class="alert alert-danger fade show">' +
        '<button type="button" class="close" data-dismiss="alert">' +
        '&times;</button><h4 class="alert-heading">Error</h4>'+error+'</div>');
    return;        
} 

function fetchAndList(){
    list();
    loadLogin();
    loadCheckin();
}

function loaded(){
    fetchAndList();
    $("#login").click(showLogin);
    $("#checkin").click(showCheckin);
    $("#signoff").click(signoff);
}


//======================================================================================================================================
//======================================================================================================================================
//======================================================================================================================================
//======================================================================================================================================


/*

  var peliculas = new Array();
  var pelicula ={id:0,nombre:"",estado:""};
  var mode='A'; //adding


  function render(){
	$("#id").val(pelicula.id);
	$("#nombre").val(pelicula.nombre);
        $("input[name='estado']").val([pelicula.estado]);
        switch(mode){
            case 'A':
                $("#cedula" ).prop( "readonly", false );
                $('#aplicar').off('click').on('click', add);
                break;
            case 'E':
                $("#cedula" ).prop( "readonly", true );
                $('#aplicar').off('click').on('click', update);
                break;             
        }
        $("#add-modal #errorDiv").html("");
        $("#add-modal #imagen").val("");        
        $('#add-modal').modal('show');        
  }
  
    function load(){
        persona = Object.fromEntries( (new FormData($("#formulario").get(0))).entries());       
    }
    
    function reset(){
        persona={cedula:"", nombre:"",sexo:""}; 
    }    
 
  function add(){
    load();
    if(!validar()) return;
    let request = new Request(url+'api/personas', {method: 'POST', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(persona)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#add-modal #errorDiv"));return;}
        addImagen();
        fetchAndList();
        reset();
        $('#add-modal').modal('hide');                
    })();    
  }
  
  function addImagen(){
    var imagenData = new FormData();
    imagenData.append("cedula", persona.cedula);
    imagenData.append("imagen", $("#imagen").get(0).files[0]); 
    let request = new Request(url+'api/personas/'+persona.cedula+"/imagen", {method: 'POST',body: imagenData});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#add-modal #errorDiv"));return;}              
    })();    
  }
  
  function update(){
    load();
    if(!validar()) return;
    let request = new Request(url+'api/personas', {method: 'PUT', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(persona)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#add-modal #errorDiv"));return;}
        fetchAndList();
        reset();
        $('#add-modal').modal('hide');                
    })();     
  }
  
  function validar(){
    var error=false;
   $("#formulario input").removeClass("invalid");
    error |= $("#formulario input[type='text']").filter( (i,e)=>{ return e.value=='';}).length>0;        
    $("#formulario input[type='text']").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    error |= $("input[name='sexo']:checked").length==0;
    if ( $("input[name='sexo']:checked").length==0) $("#formulario input[name='sexo']").addClass("invalid");
    return !error;
  }

  function list(){
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
  }
  
  function edit(cedula){
    let request = new Request(url+'api/personas/'+cedula, {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#buscarDiv #errorDiv"));return;}
        persona = await response.json();
        mode='E'; //editing
        render();        
    })();         
  }
  
  function makenew(){
      reset();
      mode='A'; //adding
      render();
    }
    
  function search(){
      //to do
  }

  function fetchAndList(){
    let request = new Request(url+'api/personas', {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#buscarDiv #errorDiv"));return;}
        personas = await response.json();
        list();              
    })();    
  } 
  
  function loaded(){
    fetchAndList();
    $("#crear").click(makenew);        
    $("#buscar").on("click",search);
  }
  
  function loadIngresoPeli(){
    var div = $("#popupRegistroPelis");
    div.html("<div class='modal fade' id='add-modal-login' tabindex='-1' role'dialog'>" +
                "<div class='modal-dialog' style='width: 400px'>" +
                    "<div class='modal-content'>" +
                        "<div class='modal-header'>" +
                            "<div > <button type='button' class='close' data-dismiss='modal'> <span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<form id='formulario1'>" +
                            "<div class='modal-body'>" +
                                "<div id='div-login-msg'>" +
                                    "<div id='icon-login-msg'></div>" +
                                    "<span id='text-login-msg'>Registrar Película</span>" +
                                "</div>" +
                                "<br>" +
                                "<div class='form-group'>" +
                                    "<label for='nombre'>Nombre</label>" +
                                    "<input type='text' class='form-control' name='nombre' id='nombre3' placeholder='Nombre'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='precio'>Precio</label>" +
                                    "<input type='text' class='form-control' name='precio1' id='precio1' placeholder='Precio'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='estado'>Estado</label>" +
                                    "<div class='form-check form-check-inline'>" +
                                        "<input class='form-check-input' type='radio' name='estadoC' id='cartelera' value='en cartelera'>" +
                                        "<div id='carte'></div>" +
                                    "</div>" +
                                    "<div class='form-check form-check-inline'>" +
                                        "<input class='form-check-input' type='radio' name='estadoB' id='bloq' value='bloqueada'>" +
                                        "<div id='blo'></div>" +
                                    "</div>" + 
                                "</div>" +  
                            "</div>" +
                        "</form>" +
                        "<div class='modal-footer d-flex justify-content-center'>" +
                            "<div>" +
                                "<input type='button' id='regPel' class='btn btn-primary btn-lg btn-block' value='Agregar'>" +
                            "</div>" +
                        "</div>" +
                        "<div id='errorDiv1' style='width:70%; margin: auto;'></div>" +
                    "</div>" +
                "</div>" +
            "</div>");
}*/
  
  $(loaded);  