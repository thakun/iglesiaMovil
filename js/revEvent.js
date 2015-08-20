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
                $('#datetime').text(res[0][1] + " " + res[0][8]);
                $('#name').text(res[0][3] + " " + res[0][4]);
                $('#mail').text(res[0][6]);
                $('#add').text(res[0][10]);
                $('#costo').text(res[0][12]);

                $("#list").css("display","block");

            }
        }

    });
}