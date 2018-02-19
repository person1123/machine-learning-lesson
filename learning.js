// Probably want to use this or something like it eventually http://handlebarsjs.com/

var inputs = [
    { type: "red", attributes: {value: 55} },
    { type: "blue", attributes: {value: 60} },
    { type: "blue", attributes: {value: 80} },
    { type: "red", attributes: {value: 58} },
    { type: "red", attributes: {value: 30} },
];


function populateInputs() {
    var parent = $(".inputs");
    
    for (var index in inputs) {
        var input = inputs[index];
        
        var container = $("<div class='input-container'></div>");
        container.attr('id', 'input_' + index);
        
        var left_column = $("<div class='input_left_column'></div>");
        var right_column = $("<div class='input_right_column'></div>");
        
        left_column.append(representation(input));
        
        for (var attr_name in input.attributes) {
            right_column.append("<div class='bar' id='input_" + index + "_attr_" + attr_name + "' style='width:" + input.attributes[attr_name] + "%'></div>");
        }
        
        container.append(left_column);
        container.append(right_column);
        
        parent.append(container);
    }
}

function representation(input) {
    return $("<div class='ball " + input.type + "'></div>");
}