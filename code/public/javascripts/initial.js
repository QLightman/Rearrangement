var property = 0;
var current_position = [0, 20],
    previous_position = [0, 20],
    number_of_stage = 0,
    property_list = 0;
var tooptip = d3.select("body")
    .append("div")
    .attr("class", "tooptip")
    .style("opacity", 0.0);
$(document).ready(function() {
    var wWidth = window.innerWidth;
    var wHeight = window.innerHeight;
    $("body").height(wHeight - 30);
    $("body").width(wWidth - 30);
    initialize();
});

function initialize() {

    for (var i = 2; i < 8; i++)
        $("#number_select").append("<option value='" + (i) + "'>" + i + "</option>")
    $('#number_select').chosen({
        width: "25%"
    });
    draw_view.initialize();
    draw_sub_view.initialize();

    d3.csv("data/Assignment3-hotel.csv", function(error, data) {
        if (error) console.log(error);
        var data = d3.csvFormat(data);
        console.log(data)
        data_handler(data);
    })

}

function data_handler(data) {
    data = data.toString().split("\n");
    for (i in data) {
        data[i] = data[i].toString().split(',');
    }
    var property_number = data[0].length;

    function Proeprty() {}
    Proeprty.prototype.id = "A";
    Proeprty.prototype.value = 0;
    Proeprty.prototype.max = 0;
    Proeprty.prototype.scale = 0;
    Proeprty.prototype.similar = 0;
    Proeprty.prototype.color = 0;
    Proeprty.prototype.position = 0;

    property = _.range(property_number);
    for (var i in property) {
        property[i] = new Proeprty();
        property[i].position = parseInt(i);
        property[i].id = data[0][i];
        property[i].value = _.range(12);
        property[i].color = _.range(12);

        for (var j = 0; j < 12; j++) {
            property[i].value[j] = parseFloat(data[j + 1][i]);
            property[i].color[j] = 0;
        }

        property[i].max = _.max(property[i].value);
    }
    for (var i in property) {
        property[i].scale = property[i].max / (Math.sqrt(Math.sqrt(property[i].max)));
        for (var j = 0; j < 12; j++) {
            property[i].value[j] /= property[i].scale;
        }
        property[i].max = _.max(property[i].value);
        for (var j = 0; j < 12; j++) {
            property[i].value[j + 12] = property[i].value[j];
            property[i].color[j + 12] = property[i].color[j];
        }
    }
    property_list = [];
    for (var i = 0; i < property.length; i++) {
        property_list.push(i);
        $("#property_select").append("<option value='" + (i) + "'>" + property[i].id + "</option>")
    }
    $('#property_select').chosen({
        width: "46%"
    });
    console.log(_.sortBy(property, function(d) {
        return -d.max;
    }))
    draw_view.main_draw();
}

$("#threshold_select").change(function() {
    draw_view.change_color($(this).val());
    draw_sub_view.remove();
})

$("#property_select").change(function() {
    number_of_stage++;
    draw_sub_view.property_select($(this).val());
})
$("#number_select").change(function() {
    console.log($(this).val())
    draw_sub_view.number_select($(this).val());
})