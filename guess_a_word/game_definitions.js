// $(function() {
	
	/////////////////////
	// CACHED ELEMENTS //
	/////////////////////
	var $letters = $("#spaces"),
			$guesses = $("#guesses"),
			$message = $("#message"),
			$apples = $("#apples");

	///////////////
  // Functions //
  ///////////////
	var randomWord = function() {
		var words = ["soul", "charzard", "pokemon", "pikachu", "aerosol", "magecraft"];
	
		return function() { 
			var word = _.sample(words);
			words.splice(words.indexOf(word), 1)
			return word;
		};
	}();

	function newGame() {
		var new_game = Object.create(Guessing_Game);
		new_game.word 						= randomWord();														
		new_game.letters_in_word 	= new_game.word.split("");
		new_game.letters_guessed = [];
		new_game.correct_spaces 	= 0;
		new_game.createBlanks();
		$("#guesses span").remove();
		return new_game;
	}

  // Checks keycode is a letter between a - z
	function isAlphaCharacter(keycode) {
		return (keycode >= 97 & keycode <= 122)
	}

	function notBeenGuessed(char) {
		return !(current_game.letters_guessed.indexOf(char) > -1);
	}

	function letterInWord(char) {
		return (current_game.letters_in_word.indexOf(char) > -1);
	}

	function indexesOf(letter) {
		var temp = [],
				i = -1;

		while((i = current_game.letters_in_word.indexOf(letter, i + 1)) >= 0 ) { 
			temp.push(i);
		}

		return temp;
	}

	function fillBlanks(char) {
		var indexes = indexesOf(char);

		// Use that index to access the spans and inject character into text of the span
		var $word_spans = $("#spaces span");

		indexes.forEach( function(idx) {
			$word_spans.eq(idx).text(char);
			current_game.correct_spaces += 1;
		});

	}

	function addToGuesses(char) {
		// make this show up in the guessed section
		var $guesses= $("#guesses")
		$guesses.append("<span>" + char + "</span>");
	}

	function setGameStatus(status) {
		$(document.body).removeClass();
		if (status) {
			$(document.body).addClass(status);
		}
	}
	
	/////////////
	// Objects //
	/////////////
	var Game = {
		createBlanks: function () {
			var spaces = (new Array(this.word.length + 1)).join("<span></span>");

			$letters.find("span").remove();
			$letters.append(spaces);
			Game.$spaces = $("#spaces span");
		}, 

		displayMessage: function(text) {
			$message.text(text);
		},

		
	}

	var Guessing_Game = Object.create(Game);
	Guessing_Game.incorrect 			= 0;
	Guessing_Game.max_incorrect 	= 6;
	Guessing_Game.word_check      = function() {
																		if (!this.word) { $message.text("I am out of words")}
																	};
  Guessing_Game.gameOver 				= function() {
																		return (this.incorrect >= this.max_incorrect);
																	};
	Guessing_Game.victory					= function () {
																		return (this.correct_spaces >= this.letters_in_word.length)
																	};

  // Event Handlers
 	$(document).on("keypress", document, function(event) {
 		var key = event.keyCode;
 		var char = String.fromCharCode(key);

 		if (isAlphaCharacter(key) & notBeenGuessed(char)) {
 			current_game.letters_guessed.push(char);
 			addToGuesses(char);

 			if (letterInWord(char)) {
 				fillBlanks(char);
 			} else {
 				$apples.removeClass("guess_" + current_game.incorrect);
 				current_game.incorrect += 1;
 				$apples.addClass("guess_" + current_game.incorrect);
 			}
 		}

 		if (current_game.gameOver()) {
 			current_game.displayMessage("Game Over. Do you want to restart?");
 			$("#message").append("<br><a href='#' id='restart'>Restart</a>");
 			setGameStatus('defeat');
 		} else if (current_game.victory()) {
 			current_game.displayMessage("Victory. Do you want to restart?");
 			$("#message").append("<br><a href='#' id='restart'>Restart</a>");
 			setGameStatus('victory');
 		}
  });

  $(document).on("click", '#restart', function(event) {
  	event.preventDefault();
  	// Clean up
  	$apples.removeClass("guess_" + current_game.incorrect);
  	$message.text("");

  	current_game = newGame();
  });
// });

// !!! TODOS
// Refactor functions into game methods
// background persists between games (fix it so it resets to grey between games)