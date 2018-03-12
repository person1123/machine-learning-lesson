// Probably want to use this or something like it eventually http://handlebarsjs.com/

var data = [
];

var dataGenerator;
var endConditionCallback;
var parentDiv;
var representation;
var left_guess;
var right_guess;

var request;

function start(dg, ecc, div, rep, lg, rg) {
    //while (parentDiv && parentDiv.children().length == 0);

    if (parentDiv) {
        parentDiv.empty();
    }
    
    dataGenerator = dg;
    endConditionCallback = ecc;
    parentDiv = div;
    representation = rep;
    left_guess = lg;
    right_guess = rg;
    
    if (request) {
        request.abort();
    }

    request = $.get("interactive-box.html", function(d){
        div.html(d);
        data = [];

        populateData();
    });
}

function populateData() {
    for (var i = 0; i < 15; i++) {
        data.push(dataGenerator());
    }
    
    var parent = $(".data-container");
    
    for (var index in data) {
        var datum = data[index];
        
        buildDiv(index, datum, parent);
    }
    
    var attributes = data[0].attributes;
    for (var attr_name in attributes) {
        $(".sliders").append('<input type="range" min="0" max="100" value="50" class="input-widget" id="attr_' + attr_name + '">');
    }
    
    $('.input-widget').on('input', inputChanged);
    
    inputChanged();
}

function buildDiv(index, datum, parent) {
    var container = $("<div class='datum-container' id='datum_" + index + "'></div>");
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

function inputChanged() {
    $(".threshold-line").css('left', $('#threshold').val() + '%');

    updateBars();
    if (scrolling) {
        toggleScrolling();
    }

    computeCorrect();
}

function updateBars() {
    for (var index in data) {
        var datum = data[index];
        
        for (var attr_name in datum.attributes) {
            $('#datum_' + index + '_attr_' + attr_name).css('width',
                (datum.attributes[attr_name] * $('#attr_' + attr_name).val() / 100) + '%');
        }
    }
}

function computeCorrect() {
    var correct = 0;
    var total = 0;
    for (var index in data) {
        var datum = data[index];
        var currDiv = $("#datum_" + index);
        if (!$(".data-container").scrollTop() + $(".data-container").height() < currDiv.position().top) {
            break;
        }

        var value = 0;
        var guess;
        for (var attr_name in datum.attributes) {
            value += datum.attributes[attr_name] * $('#attr_' + attr_name).val() / 100;
        }
        if (value < $('#threshold').val()) {
            guess = left_guess;
        } else {
            guess = right_guess;
        }

        if (guess == datum.type) {
            correct++;
        }
        if (training && !datum.trained) {
            //var error = $('#threshold').val() - value;
            var error = (datum.type == left_guess ? 0 : 100) - value;
            for (var attr_name in datum.attributes) {
                var curr = $('#attr_' + attr_name).val();
                
                $('#attr_' + attr_name).val(curr - learningRate * error * datum.attributes[attr_name])
            }
            
            //$('#threshold').val($('#threshold').val() - learningRate * error * 10);
            //$(".threshold-line").css('left', $('#threshold').val() + '%');
            
            datum.trained = true;
        }
        total++;
    }

    $('#percent_correct').text((correct / total * 100).toFixed(0) + "%");

    endConditionCallback(data, correct / total);
}

function addData() {
    var datum = dataGenerator();
    var index = data.length;
    data.push(datum);
    
    var parent = $(".data-container");
    buildDiv(index, datum, parent)

    $(".data-container").animate({
        scrollTop: $(".data-container").scrollTop() + $('#datum_' + index).outerHeight()
    }, 250);

    updateBars();
    computeCorrect();
}

var scrolling = false;
var timerId;
function toggleScrolling() {
    if (!scrolling) {
        $("#scroll_toggle_button").attr('value', 'Stop');
        timerId = setInterval(addData, 1000);
        scrolling = true;
    } else {
        $("#scroll_toggle_button").attr('value', 'Start');
        clearInterval(timerId);
        scrolling = false;
        $(".data-container").stop();
        var removing = Math.floor($(".data-container").scrollTop() / $(".datum-container").outerHeight());
        for (var index in data) {
            if (index - removing < 0) {
                $("#datum_" + index).remove();
            } else {
                $("#datum_" + index).attr('id', "datum_" + (index - removing));
            }
        }
        data = data.slice(removing);
        $(".data-container").scrollTop(0);
    }
}

function finish() {
    if (scrolling) {
        toggleScrolling();
    }
}

var learningRate = .02;
var training = false;
function startTraining() {
    if (!scrolling) {
        toggleScrolling();
    }
    training = true;
}