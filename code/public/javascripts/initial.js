$(document).ready(function() {
    var wWidth = window.innerWidth;
    var wHeight = window.innerHeight;
    $("body").height(wHeight - 30);
    $("body").width(wWidth - 30);
    initialize();
});

function initialize() {
    d3.csv("data/Assignment3-hotel.csv", function(error, data) {
        if (error) console.log(error);
        console.log(data);
    })
    draw_view.initialize();
    draw_sub_view.draw("#block2_bottom_div");
    draw_sub_view.draw("#block3_bottom_div");

}