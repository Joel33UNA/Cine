
var movies=[
{"code":111,"name":"Spider Man","imagen": "https://i2.wp.com/hipertextual.com/wp-content/uploads/2019/06/hipertextual-4-trajes-spider-man-lejos-casa-nuevo-trailer-2019196176.jpg?fit=1920%2C1080&ssl=1", "price": 3000,"proyecciones":{"date":["May 28, 11am"],"sala":"A5","occupancy":[{"row":5,"col":3},{"row":5,"col":4}]}},
{"code":222,"name":"Iron Man","imagen": "https://imagenes.20minutos.es/files/image_656_370/uploads/imagenes/2020/03/23/IronMan301.jpg","price": 4000,"proyecciones":{"date":["Jun 05, 3pm"], "sala":"D1","occupancy":[{"row":1,"col":3},{"row":6,"col":4}]}},
{"code":333,"name":"Thor","imagen": "https://lanetaneta.com/wp-content/uploads/2019/03/8-maneras-en-que-Marvel-amp-039-s-Thor.jpg","price": 5000,"proyecciones":{"date":["Jan 22, 1pm"], "sala":"C2","occupancy":[{"row":2,"col":3},{"row":2,"col":4}]}},
{"code":444,"name":"Captain America","imagen": "https://i2.wp.com/wipy.tv/wp-content/uploads/2020/05/retorno-de-captain-america-al-mcu.jpg?fit=1000%2C600&ssl=1","price": 6000,"proyecciones":{"date":["Nov 11, 2:30pm"], "sala":"E8","occupancy":[{"row":4,"col":3},{"row":4,"col":4}]}},
{"code":555,"name":"Doctor Strange","imagen": "https://i2.wp.com/hipertextual.com/wp-content/uploads/2020/09/hipertextual-libro-que-leyendo-stan-lee-su-cameo-doctor-strange-no-es-casual-2020819727.jpg?fit=1600%2C1067&ssl=1","price": 7000,"proyecciones":{"date":["Sep 30, 10am"], "sala":"F5","occupancy":[{"row":3,"col":3},{"row":3,"col":4}]}},
{"code":777,"name":"Black Widow","imagen": "https://www.tonica.la/__export/1600117063114/sites/debate/img/2020/09/14/black-widow-lanzarx-2-nuevos-trailer.jpg_423682103.jpg","price": 8000,"proyecciones":{"date":["Jul 02, 2pm"], "sala":"G4","occupancy":[{"row":1,"col":7},{"row":1,"col":8}]}}
];


function mostrarProyecciones(ps){
    body = document.getElementsByTagName('body')[0];
        h1 = document.createElement("h1");
        tx = document.createTextNode("Cinema 2.0");
        h1.appendChild(tx);
        body.appendChild(h1);
        div1 = document.createElement("div");
        div1.setAttribute("class", "grid-container");
    for(i = 0; i < ps.length; i++){
        div2 = document.createElement("div");
        div2.setAttribute("class", "father");
        div21 = document.createElement("div");
            div21.setAttribute("class", "updiv");
            ima = document.createElement("img");
            ima.setAttribute("src", ps[i].imagen);
            div21.appendChild(ima);
        div22 = document.createElement("div");
            div22.setAttribute("class", "downdiv");
            ul = document.createElement("ul");
            li = document.createElement("li");
            p = document.createElement("p");
            texto1 = document.createTextNode(ps[i].name);
            texto2 = document.createTextNode(ps[i].proyecciones.date[0] + " / " + ps[i].proyecciones.sala);
            p.appendChild(texto1);
            li.appendChild(texto2);
            a = document.createElement("a");
            a.setAttribute("href", "js/booking.html");
            a.appendChild(li);
            ul.appendChild(a);
            div22.appendChild(p);
            div22.appendChild(ul);
        div2.appendChild(div21);    
        div2.appendChild(div22);
        div1.appendChild(div2);
    }
    body.appendChild(div1);
}

mostrarProyecciones(movies);