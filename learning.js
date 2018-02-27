// Probably want to use this or something like it eventually http://handlebarsjs.com/

var data = [
];

var dataGenerator;

function ballGenerator() {
    var ball = {};
    ball.attributes = {}
    if (Math.random() > 0.6) {
        ball.type = "blue";
        ball.attributes.value = 60 + (Math.random() - 0.5) * 40;
    } else {
        ball.type = "red";
        ball.attributes.value = 30 + (Math.random() - 0.5) * 30;
    }
    return ball;
}

dataGenerator = ballGenerator;

function populateData() {
    for (var i = 0; i < 15; i++) {
        data.push(dataGenerator());
    }
    
    var parent = $(".data-container");
    
    for (var index in data) {
        var datum = data[index];
        
        var container = $("<div class='datum-container'></div>");
        container.attr('id', 'datum_' + index);
        
        var left_column = $("<div class='datum_left_column'></div>");
        var right_column = $("<div class='datum_right_column'></div>");
        
        left_column.append(representation(datum));
        
        for (var attr_name in datum.attributes) {
            right_column.append("<div class='bar' id='datum_" + index + "_attr_" + attr_name + "'></div>");
        }
        
        container.append(left_column);
        container.append(right_column);
        
        parent.append(container);
    }
    
    var attributes = data[0].attributes;
    for (var attr_name in attributes) {
        $(".sliders").append('<input type="range" min="0" max="100" value="50" class="input-widget" id="attr_' + attr_name + '">');
    }
    
    $('.input-widget').on('input', inputChanged);
    
    inputChanged();
}

function representation(datum) {
    return $("<div class='ball " + datum.type + "'></div>");
}

function inputChanged() {
    $(".threshold-line").css('left', $('#threshold').val() + '%');
    
    for (var index in data) {
        console.log(index);
        var datum = data[index];
        
        for (var attr_name in datum.attributes) {
            console.log('#datum_' + index + '_attr_' + attr_name);
            console.log($('#datum_' + index + '_attr_' + attr_name));
            $('#datum_' + index + '_attr_' + attr_name).css('width', (datum.attributes[attr_name] * $('#attr_' + attr_name).val() / 100) + '%');
        }
    }
}

function computeCorrect() {
    
}