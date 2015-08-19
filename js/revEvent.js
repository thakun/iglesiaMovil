$(document).ready(function () {
    $("#save").click(function () {
        getEvents($("#cod").val());
    });
});


var getEvents = function (id) {

    var info = {fecha:id};

    var jsonString = JSON.stringify(info);

    $.ajax({
        type: "POST",
        url: "http://192.168.1.74/iglesia/Server/conexionClienteServidor.php",
        data: {style:3,class:'Evento',function:'getEventById',data:jsonString},
        cache: false,

        success: function(resultado){

            var res = (JSON.parse(resultado));
            if(res[0].length > 0){
                console.log(res);
                window.location.href = "http://192.168.1.74/iglesia/Server/pdf.php?res=" +res;
            }
        }

    });
}