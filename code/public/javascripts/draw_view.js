var draw_view = {
    data: 0,
    initialize: function() {
        var self = this;
        var div = "#left_div";
        view = d3.select(div).append("svg")
            .attr("id", "main_div")
            .attr("width", $(div).width())
            .attr("height", $(div).height());
        var rect = view.append("rect")
            .attr("x", 20)
            .attr("y", 20)
            .attr("width", 100)
            .attr("height", 100)
            .attr("stroke", "black");
    },
    main_draw() {

    },
    change_color() {

    },
    test: function(index) {
        var self = this;
    }

}