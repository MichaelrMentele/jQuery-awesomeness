$(function(){

	var $canvas = $("#canvas");

	function getFormObject($form) {
		var object = {};

		$form.serializeArray().forEach(function(input) {
			object[input.name] = input.value;
		});

		return object;
	}

	function createElement(data) {
		var $div = $("<div />", {
			"class": data.shape,
			data: data,
		});

		resetElement($div);

		return $div
	}

	function animateElement() {
		var $ele = $(this),
				data = $ele.data();

		resetElement($ele);
		$ele.animate({
			left: +data.end_x,
			top: +data.end_y,
		}, 1000);		
	}

	function resetElement($ele) {
		var data = $ele.data();

		$ele.css({
			left: +data.start_x,
			top: +data.start_y,
		});
	}

	// add shapes
	$("form").submit( function(e){
		e.preventDefault();

		var $form = $(this),
				data = getFormObject($form);

		$canvas.append(createElement(data));
	});

	// reset and start all animations
	$("#start").click(function(event) {
		event.preventDefault();

		$canvas.find("div").each(animateElement);
	});

	// freeze all animations
	$("#stop").click(function(event){
		event.preventDefault();
		$canvas.find("div").stop();
	});

});