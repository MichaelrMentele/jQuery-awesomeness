// $(function() {
	
	// CACHED ELEMENTS
	var $letters = $("#spaces"),
			$guesses = $("#guesses"),
			$message = $("#message"),
			$apples = $("#apples");
	
	// Functions
	var randomWord = function() {
		var words = ["soul", "charzard", "pokemon", "pikachu", "aerosol", "magecraft"];
	
		return function() { 
			var word = _.sample(words);
			words.splice(words.indexOf(word), 1)
			return word;
		};
	}();

	// Objects
	var Game = {
		createBlanks: function () {
			var spaces = (new Array(this.word.length + 1)).join("<span>   </span>");

			$letters.find("span").remove();
			$letters.append(spaces);
			Game.$spaces = $("#spaces span");
		}, 

		displayMessage: function(text) {
			$message.text()
		},

		init: function() {
			this.createBlanks();
		},
	}

	var Guessing_Game = Object.create(Game);
	Guessing_Game.word 						= randomWord();
	Guessing_Game.incorrect 			= 0;
	Guessing_Game.max_incorrect 	= 6;
	Guessing_Game.letters_guessed = [];
	Guessing_Game.correct_spaces 	= 0;
	Guessing_Game.reset 					= function() {};
	Guessing_Game.new_game        = function() {};
	Guessing_Game.word_check      = function() {
																		if (!this.word) { $message.text("I am out of words")}
																	};
	Guessing_Game.letters_in_word = Guessing_Game.word.split("");

	var current_game = Object.create(Guessing_Game);
  
  // Checks keycode is a letter between a - z
	function isAlphaCharacter(keycode) {
		return (keycode >= 97 & keycode <= 122)
	}

	function notBeenGuessed(keycode) {
		return !(current_game.letters_guessed.indexOf(keycode) > -1);
	}

	function letterInWord(keycode) {
		var char = String.fromCharCode(keycode);
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

	function fillBlanks(keycode) {
		var char = String.fromCharCode(keycode);

		// find indexOf character(s) in word
		var indexes = indexesOf(char);

		// Use that index to access the spans and inject character into text of the span
		var $spans = $("#spaces span");

		$spans.each( function(index, obj) {
			indexes.forEach( function(ele) {
				if (index === ele) {
					$(this).text(char);
				}
			});
		});
	}

	function addToGuesses(keycode) {
		// make this show up in the guessed section
	}

  // Event Handlers
 	$(document).keypress(function(event) {
 		var key = event.keyCode
 		if (isAlphaCharacter(key) & notBeenGuessed(key)) {
 			current_game.letters_guessed.push(key);
 			addToGuesses(key);

 			if (letterInWord(key)) {
 				fillBlanks(key);
 			} else {
 				$apples.removeClass("guess_" + current_game.incorrect);
 				current_game.incorrect += 1;
 				$apples.addClass("guess_" + current_game.incorrect);
 			}
 		}

  });
// });

// If the guess matches at least one letter in the word, output each instance of the guessed letter in the respective blank spaces
// If the guess is not a match, increment the incorrect guess count and change the class name on the apples container to change the count of apples
// If the letter has already been guessed, ignore it
// When a letter is guessed, write it to the guesses container
// If the number of incorrect guesses matches the number of guesses available for a game, 6, the game is over. Display a message and a link to start a new game. Unbind the keypress event.
// If all of the letters of the word have been revealed, display a win message and a link to start a new game. Unbind the keypress event.
// When new game is clicked, a new game is constructed. The class on the apples container gets reset to show 6 apples again.