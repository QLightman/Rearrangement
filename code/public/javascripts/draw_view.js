var draw_view = {
    div: 0,
    width: 0,
    height: 0,
    view: 0,
    rect_array: 0,
    text_array: 0,
    line_array: 0,
    initialize: function() {
        var self = this;
        self.div = "#left_div";
        self.height = $(self.div).height();
        self.width = $(self.div).width();
        self.view = d3.select(self.div).append("svg")
            .attr("id", "main_svg")
            .attr("width", self.width)
            .attr("height", self.height);
    },
    main_draw: function() {
        var self = this;
        var block_width = self.width / 40;
        var block_height = self.height / 62;

        var y_distance = 20;
        this.rect_array = new Array(property.length);
        this.line_array = new Array(property.length);
        this.text_array = new Array(property.length);

        for (var i = 0; i < property.length; i++) {
            y_distance += property[i].max * block_height + 5;
            this.rect_array[i] = self.view.append("g")
                .selectAll("rect")
                .data(property[i].value)
                .enter()
                .append("rect")
                .attr("width", block_width)
                .attr("height", function(d) {
                    return block_height * d;
                })
                .attr("x", function(d, t) {
                    return block_width * (3 + t);
                })
                .attr("y", function(d) {
                    return y_distance - block_height * d;
                })
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("fill", function(d) {
                    return "white";
                })

            this.line_array[i] = self.view.append("g")
                .append("line")
                .attr("x1", 3 * block_width)
                .attr("x2", 27 * block_width)
                .attr("y1", y_distance)
                .attr("y2", y_distance)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
            this.text_array[i] = self.view.append("g")
                .append("text")
                .attr("x", 32 * block_width)
                .attr("y", y_distance - block_height * property[i].max * 0.3)
                .text(property[i].id)
        }
    },
    change_color: function(threshold) {
        var self = this;
        for (var i = 0; i < property.length; i++) {
            for (var j in property[i].color) {
                property[i].color[j] = property[i].value[j] > property[i].max * threshold / 100 ? 1 : 0;
            }
            this.rect_array[i]
                .attr("fill", function(d) {
                    if (d > property[i].max * threshold / 100)
                        return "black";
                    return "white";
                });
        }
        console.log(property)
    }

}