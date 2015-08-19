$(window).ready(function(){
   $('#background').height($(window).height()-32);
});

$(window).on("resize", function () {
    $('#background').height($(window).height()-32);
});


