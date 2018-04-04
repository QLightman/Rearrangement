var draw_sub_view = {
    div: 0,
    width: 0,
    height: 0,
    view: 0,
    rect_array: 0,
    text_array: 0,
    line_array: 0,
    sort_result: 0,
    y_distance: 0,
    current_delete_result: 0,
    initialize: function() {
        var self = this;
        self.div = "#block_div";
        self.height = $(self.div).height();
        self.width = $(self.div).width();
        self.y_distance = 0;
        self.view = d3.select(self.div).append("svg")
            .attr("id", "block_svg")
            .attr("width", self.width)
            .attr("height", self.height);
    },
    property_select: function(property_index) {
        var self = this;
        var result = [];
        previous_position[1] = current_position[1];
        for (var i in property) property[i].similar = 0;
        result.push(property_index);
        property[property_index].similar = 30;
        for (var i = 0; i < property.length; i++) {
            if (i == property_index) continue;
            for (j in property[i].color) {
                if (property[i].color[j] == property[property_index].color[j]) property[i].similar++;
            }
        }
        var sort = _.sortBy(property, function(d) {
            return -d.similar;
        })
        console.log(sort)
        self.sort_result = [];
        self.current_delete_result = [];
        for (var i = 0; i < property.length; i++) {
            if (($.inArray(sort[i].position, property_list)) == -1) continue;
            self.sort_result.push(sort[i].position);
        }
        console.log(self.sort_result);
        for (var i = 0; i < 5; i++) {
            property_list.splice(_.indexOf(property_list, self.sort_result[i]), 1);
            self.current_delete_result.push(self.sort_result[i]);
        }
        self.change_range();

        self.main_draw(self.sort_result.slice(0, 5), current_position[1]);
        current_position[1] = self.y_distance + self.height / 62 * 5;
        if (current_position[1] > self.height * 0.7) {
            current_position = [(self.width / 2) * 1.1, 20];
        }
    },
    number_select: function(property_number) {
        var self = this;
        d3.selectAll(".div_element" + number_of_stage).remove();
        property_list = _.union(property_list, self.current_delete_result);
        self.current_delete_result = [];
        for (var i = 0; i < property_number; i++) {
            property_list.splice(_.indexOf(property_list, self.sort_result[i]), 1);
            self.current_delete_result.push(self.sort_result[i]);
        }
        self.change_range();

        self.main_draw(self.sort_result.slice(0, property_number), previous_position[1]);
        current_position[1] = self.y_distance + self.height / 62 * 5;
        if (current_position[1] > self.height * 0.7) {
            current_position = [(self.width / 80) * 43, 20];
        }
    },
    main_draw: function(array, distance) {
        var self = this;
        var block_width = (self.width / 2) / 40;
        var block_height = self.height / 62,
            i;

        self.y_distance = distance;
        this.rect_array = new Array(property.length);
        this.line_array = new Array(property.length);
        this.text_array = new Array(property.length);

        for (var k = 0; k < array.length; k++) {
            i = array[k];
            self.y_distance += property[i].max * block_height + 5;
            this.rect_array[i] = self.view.append("g")
                .selectAll("rect")
                .data(property[i].value)
                .enter()
                .append("rect")
                .attr("class", "div_element" + number_of_stage)
                .attr("width", block_width)
                .attr("height", function(d) {
                    return block_height * d;
                })
                .attr("x", function(d, t) {
                    return current_position[0] + block_width * (3 + t);
                })
                .attr("y", function(d) {
                    return self.y_distance - block_height * d;
                })
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("fill", function(d) {
                    var threshold = $("#threshold_select").val();
                    if (d > property[i].max * threshold / 100)
                        return "black";
                    return "white";
                });
            this.line_array[i] = self.view.append("g")
                .append("line")
                .attr("class", "div_element" + number_of_stage)

            .attr("x1", current_position[0] + 3 * block_width)
                .attr("x2", current_position[0] + 27 * block_width)
                .attr("y1", self.y_distance)
                .attr("y2", self.y_distance)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
            this.text_array[i] = self.view.append("g")
                .attr("class", "div_element" + number_of_stage)
                .append("text")
                .attr("x", current_position[0] + 32 * block_width)
                .attr("y", self.y_distance - block_height * property[i].max * 0.3)
                .text(property[i].id)
        }
    },
    change_range: function() {
        $("#property_select").empty();
        $("#property_select").chosen("destroy");
        $("#property_select").append("<option value='" + (0) + "'>" + "" + "</option>")
        for (var i in property_list) {
            var index = property_list[i];
            $("#property_select").append("<option value='" + (index) + "'>" + property[index].id + "</option>")
        }
        $('#property_select').chosen({
            width: "46%"
        });
    },
    remove: function() {
        var self = this;
        current_position = [0, 20];
        previous_position = [0, 20];
        number_of_stage = 0;
        property_list = [];
        for (var i = 0; i < property.length; i++) {
            property_list.push(property[i].position);
        }
        self.view.selectAll("g").remove();
    }
}