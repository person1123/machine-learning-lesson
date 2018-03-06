
function startSimpleExample() {
	$("#hero").removeClass("visible");
	$("#simple-example").addClass("visible");
	$("#intro-text").addClass("top");
	$("#simple-example-button").animate({"opacity": 0, "height": 0});

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

	function simpleExampleFinished(data, correct) {
		if (correct > .86 && data.length > 25) {
			finish();
			$("#intro-text").removeClass("visible");
		}
	}

	start(ballGenerator, simpleExampleFinished);
}