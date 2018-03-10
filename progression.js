progressionFunctions = [
    startSimpleExample,
    simpleExampleFinished,
    startTwoExample,
    twoExampleFinished
];

$("document").ready(function() {
   if (window.location.hash != "") {
        var count = parseInt(window.location.hash.substring(1));
        for (var i = 0; i < count; i++) {
            progressionFunctions[i]();
        }
   }   
});

function startSimpleExample() {
	$("#hero").removeClass("visible");
	$("#simple-example").addClass("visible");
	$("#intro-text").addClass("top");
	$("#simple-example-button").animate({"opacity": 0, "height": 0, "margin-bottom": 0});


function representation(datum) {
    return $("<div class='ball " + datum.type + "'></div>");
}
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
    
    function endConditionCallback(data, correct) {
        if (correct > .86 && data.length > 25) {
            finish();
            simpleExampleFinished();
        }
    }

	start(ballGenerator, endConditionCallback, $("#simple-example"), representation, "red", "blue");
}

function simpleExampleFinished() {
    $("#intro-text").removeClass("visible");
    $("#second-text").addClass("visible");
}

function startTwoExample() {
	$("#simple-example").removeClass("visible");
	$("#two-example").addClass("visible");
	$("#second-text").addClass("top");
	$("#two-example-button").animate({"opacity": 0, "height": 0, "margin-bottom": 0});

	function representation(datum) {
	    return $("<div class='ball " + datum.color + " " + datum.size + "'></div>");
	}

	function ballGenerator() {
	    var ball = {};
	    ball.attributes = {}
        
        var green = Math.random() < 0.5;
        var small = Math.random() < 0.5;
        if (green) {
	        ball.attributes.color = 30 + (Math.random() - 0.5) * 30;
        } else {
	        ball.attributes.color = 60 + (Math.random() - 0.5) * 40;
        }
        if (small) {
	        ball.attributes.size = 20 + (Math.random() - 0.5) * 30;
        } else {
	        ball.attributes.size = 80 + (Math.random() - 0.5) * 40;
        }
	    if (green && small) {
	        ball.type = "green_small";
	    } else {
	        ball.type = "other";
	    }
	    ball.color = green ? "green" : "yellow";
	    ball.size = small ? "small" : "";
	    return ball;
	}
    
    function endConditionCallback(data, correct) {
        if (correct > .86 && data.length > 25) {
            finish();
            twoExampleFinished();
        }
    }

	start(ballGenerator, endConditionCallback, $("#two-example"), representation, "green_small", "other");
}

function twoExampleFinished(data, correct) {
    $("#second-text").removeClass("visible");
    $("#real-world-text").addClass("visible");
}