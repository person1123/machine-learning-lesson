progressionFunctions = [
    startSimpleExample,
    simpleExampleFinished,
    startTwoExample,
    twoExampleFinished,
    downloadRealWorldData
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
	$("#arrows").css("top", "100%");


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

var hmdaData;
/*var query = "https://api.consumerfinance.gov/data/hmda/slice/hmda_lar.json" +
	"?%24where=msamd_name%3D%27Baltimore%2C%20Columbia%2C%20Towson%20-%20MD%27"*/

var query = "hmda_lar_good.json"
var metrics = [ "loan_amount_000s", "number_of_1_to_4_family_units",
				  "number_of_owner_occupied_units", "minority_population", "population", "rate_spread",
				  "tract_to_msamd_income" ];

var mins = {};
var maxes = {};

function downloadRealWorldData() {
	hmdaData = $.getJSON(query, function(data) {
		hmdaData = data.results;

		for (var i in metrics) {
			mins[i] = hmdaData[0][metrics[i]];
			maxes[i] = hmdaData[0][metrics[i]];
		}

		for (var j = 1; j < hmdaData.length; j++) {
			for (var i in metrics) {
				if (hmdaData[j][metrics[i]] < mins[i]) {
					mins[i] = hmdaData[j][metrics[i]];
				}
				if (hmdaData[j][metrics[i]] > maxes[i]) {
					maxes[i] = hmdaData[j][metrics[i]];
				}
			}
		}

		startRealWorldExample();
	});
}

function startRealWorldExample() {
	$("#two-example").removeClass("visible");
	$("#real-world-example").addClass("visible");
	$("#real-world-text").addClass("top");
	$("#real-world-example-button").animate({"opacity": 0, "height": 0, "margin-bottom": 0});

	function representation(datum) {
	    return $("<div class='mortgage " + datum.type + "'></div>");
	}

	var index = 0;

	function mortgageGenerator() {
		var datum = hmdaData[index];
        index++;

		var item = {};
	    item.attributes = {};

	    for (var i in metrics) {
	    	item.attributes[metrics[i]] = (datum[metrics[i]] - mins[i]) / (maxes[i] - mins[i]) * 20;
	    }

	    //loan originated
	    // may want to filter out 6: loan purchased by the institution
	    if (datum.action_taken == 1) {
	    	item.type = "success";
	    } else {
	    	item.type = "failure";
	    }

	    return item;
	}
    
    function endConditionCallback(data, correct) {
        if (correct > .86 && data.length > 25) {
            finish();
            realWorldExampleFinished();
        }
    }

	start(mortgageGenerator, endConditionCallback, $("#real-world-example"), representation, "failure", "success");
}

function realWorldExampleFinished(data, correct) {
    $("#real-world-text").removeClass("visible");
    $("#adfadsfasdfad-text").addClass("visible");
}