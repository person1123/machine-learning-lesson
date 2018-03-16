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
        $(".sliders").append('<input type="range" min="-100" max="100" value="50" class="input-widget" id="attr_' + attr_name + '">');
    }
    
    $('.input-widget').on('input', inputChanged);
    $('.input-widget').on('mousedown', function() {
        var clss = $(this).attr('id').substring(5) + '_bar';
        $('.' + clss).addClass('highlighted');
    });
    $('.input-widget').on('mouseup', function() {
        var clss = $(this).attr('id').substring(5) + '_bar';
        $('.' + clss).removeClass('highlighted');
    });
    
    inputChanged();
}

function buildDiv(index, datum, parent) {
    var container = $("<div class='datum-container' id='datum_" + index + "'></div>");
    container.attr('id', 'datum_' + index);
    
    var left_column = $("<div class='datum_left_column'></div>");
    var right_column = $("<div class='datum_right_column'></div>");
    
    left_column.append(representation(datum));
    
    for (var attr_name in datum.attributes) {
        right_column.append("<div class='bar " + attr_name + "_bar' id='datum_" + index + "_attr_" + attr_name + "'></div>");
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
                attributeValue(datum, attr_name) + '%');
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

        var guess = getGuess(datum);
        if (guess == datum.type) {
            correct++;
        }
        if (training && !datum.trained) {
            train(datum);
        }
        total++;
    }

    $('#percent_correct').text((correct / total * 100).toFixed(0) + "%");

    endConditionCallback(data, correct / total);
}

function attributeValue(datum, attr_name) {
    return (100 + datum.attributes[attr_name] * $('#attr_' + attr_name).val() / 100.0) / 2 / Object.keys(datum.attributes).length;
}

function getValue(datum) {
    var value = 0;
    var guess;
    for (var attr_name in datum.attributes) {
        value += attributeValue(datum, attr_name);
    }
    return value;
}

function getGuess(datum) {
    var value = getValue(datum);
    if (value < $('#threshold').val()) {
        return left_guess;
    } else {
        return right_guess;
    }
}

var metrics = [ "loan_amount_000s", "number_of_1_to_4_family_units",
                  "number_of_owner_occupied_units", "minority_population", "population",
                  "tract_to_msamd_income" ]
var trained_values = [ -6.66888963e+01,  -7.57406808e-14,  -7.57406808e-14, -1.56358345e+01, 6.66888963e+01,  -3.90462296e+01]
var trained_intercept = 7.77777
function train(datum) {
    /*var value = getValue(datum);
    //var error = $('#threshold').val() - value;
    var error = 1 - (datum.type == left_guess ? -1 : 1) * (value - $('#threshold').val());
    for (var attr_name in datum.attributes) {
        var curr = $('#attr_' + attr_name).val();
        
        $('#attr_' + attr_name).val(curr - learningRate * error * datum.attributes[attr_name])
    }
    
    //$('#threshold').val($('#threshold').val() - learningRate * error * 10);
    //$(".threshold-line").css('left', $('#threshold').val() + '%');
    */
    datum.trained = true;
    for (var i in metrics) {
        $('#attr_' + metrics[i]).val(trained_values[i] * 100);
    }
    $("#threshold").val(trained_intercept + 50);
    $(".threshold-line").css('left', $('#threshold').val() + '%');
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

var learningRate = .05;
var training = false;
function startTraining() {
    if (!scrolling) {
        toggleScrolling();
    }
    training = true;
}