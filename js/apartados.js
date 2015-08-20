var adicionales = function () {

    var info = {};

    var jsonString = JSON.stringify(info);

    $.ajax({
        type: "POST",
        url: "http://192.168.1.74/iglesia/Server/conexionClienteServidor.php",
        data: {style:2,class:"Adicionales",function:"mostrarAdicionales",data : jsonString},
        cache: false,

        success: function(resultado){
            showAditionals(resultado);
        }

    });

}

var showAditionals = function (resultado) {

    var res = JSON.parse(resultado);

    for(var i = 0; i < res.length; i++) {

        var opt = $("<option>",
            {
                value: res[i][0],
                text: res[i][1]
            });

        $("#adc").append(opt);
    }
}

var showDisponibilidad = function (fecha) {

    var info = {fecha:fecha};

    var jsonString = JSON.stringify(info);

    $.ajax({
        type: "POST",
        url: "http://192.168.1.74/iglesia/Server/conexionClienteServidor.php",
        data: {style:4,class:'Horario',function:'mostrarDisponibilidad',data:jsonString},
        cache: false,

        success: function(resultado){
            showHorarios(JSON.parse(resultado));
        }

    });
}

var showHorarios= function (resultado) {

    $(".hor").empty();

    var form = $("<form>");

    resultado[0].forEach(function (element, index, array) {

        var label = $("<label>",{
            text: showDia(element[1]) + "  " + element[2] + "  $" + element[3]

        });

        label.css("float","left");

        var radio = $("<input>",{
            type:'radio',
            value: element[0],
            name: "horario"

        });
        form.append(label,radio,"<br/><br/>");
    });

    $(".hor").append(form);

}

var showDia = function (dia) {
    switch (dia){
        case "1": return "Domingo";
            break;
        case "2": return "Lunes";
            break;
        case "3": return "Martes";
            break;
        case "4": return "Miercoles";
            break;
        case "5": return "Jueves";
            break;
        case "6": return "Viernes";
            break;
        case "7": return "Sabado";
            break;
        default: return "mal";
            break;
    }
}

var createPersona = function () {
    var info = {name:$("#name").val(),lastname:$("#lastname").val(),address:$("#address").val(),mail:$("#mail").val()};

    var jsonString = JSON.stringify(info);

    $.ajax({
        type: "POST",
        url: "http://192.168.1.74/iglesia/Server/conexionClienteServidor.php",
        data: {style:1,class:'Persona',function:'createPersona',data:jsonString},
        cache: false,

        success: function(){
            selectLastPersona();
        }

    });
}

var selectLastPersona = function () {
    var info = {};

    var jsonString = JSON.stringify(info);

    $.ajax({
        type: "POST",
        url: "http://192.168.1.74/iglesia/Server/conexionClienteServidor.php",
        data: {style:2,class:'Persona',function:'getLastId',data:jsonString},
        cache: false,

        success: function(data){

            var res = JSON.parse(data);
            createEvento(res[0][0])
        }

    });
}

var createEvento = function (id) {
    var info = {fecha:$("#fecha").val(),descripcion:$("#descripcion").val(),idpersona:id,idadicional:$("#adc").val(),idhorario:$('input:radio[name=horario]:checked').val()};

    var jsonString = JSON.stringify(info);

    $.ajax({
        type: "POST",
        url: "http://192.168.1.74/iglesia/Server/conexionClienteServidor.php",
        data: {style:1,class:'Evento',function:'createEvent',data:jsonString},
        cache: false,

        success: function(data){
            getEventInserted();
        }

    });
}

var getEventInserted = function () {
    var info = {};

    var jsonString = JSON.stringify(info);

    $.ajax({
        type: "POST",
        url: "http://192.168.1.74/iglesia/Server/conexionClienteServidor.php",
        data: {style:2,class:'Evento',function:'loadLastId',data:jsonString},
        cache: false,

        success: function(data){
            alert(data);
        }

    });
}

var cleanForm = function () {
    form = $(".form1");

    form.find("input, select, textarea").each(function (index, element, array) {
        console.log(element);
        console.log(element.nodeName.toUpperCase())
        switch(element.nodeName.toUpperCase()){
            case 'INPUT':
            case 'TEXTAREA':
                element.value = "";
                break;
            case 'SELECT':
                element.value = 0;
                break;
        }
    });
}
$(window).ready(function () {
    adicionales();
    $('#btnSearch').click(function () {
        showDisponibilidad($('#fecha').val());
    });

    $('#btnEvent').click(function () {
        //createPersona();
        cleanForm();
    });

});

