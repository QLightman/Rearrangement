var draw_sub_view = {
    data: 0,
    draw: function(div) {
        var self = this;
        view = d3.select(div).append("svg")
            .attr("id", "view" + div)
            .attr("width", $(div).width())
            .attr("height", $(div).height());
        var rect = view.append("rect")
            .attr("x", 20)
            .attr("y", 20)
            .attr("width", 100)
            .attr("height", 100)
            .attr("stroke", "black");
    }
}