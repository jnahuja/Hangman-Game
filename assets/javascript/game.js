$(document).ready(function () {
    
    // Define our initial variables, including "wins", "losses", "word array", and an empty variable for the user's letter guess
    var wins = 0;
    var losses = 0;
    var wordBank = ["melon", "city", "square", "pop"];
    var userGuess;

    var main = $("body");
    var currentWordDiv = main.find("#currentWord");
    var lettersGuessedDiv = main.find("#lettersGuessed");
    var guessesRemainingDiv = main.find("#guessesRemaining");

    // Define an object for the setup of the game. The object must include:
    // (1) A function for selecting the word from the wordBank
    // (2) A function for extracting the characters of that word and populating another array with them
    // (3) A way to create new "divs" for the initial word (and apply a bottom border to those divs)
    // (4) Initializing the Number of Guesses Remaining
    // (5) Defining an empty array for Letters already guessed

    // Store data in an object, with methods attached to that object, or build functions to execute game setup and gameplay?
    // function gamePlay() {
    // }

    var gamePlay = {
        wordBankIndex: 0,
        mainWordString: "",
        mainWord: [],
        guessesRemaining: 10,
        lettersWrong: [],
        lettersCorrect: [],


        selectWord: function () {
            this.wordBankIndex = Math.floor(Math.random() * wordBank.length);
            console.log(this.wordBankIndex);
            this.mainWordString = wordBank[this.wordBankIndex];
            for (i=0; i<this.mainWordString.length; i++) {
                this.mainWord[i] = this.mainWordString.charAt(i);
            }
        },

        // Build out our list of words, each in a different color
        // (1) Loop through all colors in the array
        // (2) Create element to hold word
        // (3) Populate that element with a word from our "word" array
        // (4) Make the word a random color from our "text color" array
        buildWord: function() {
            for (var i = 0; i < this.mainWord.length; i++) {
                // 1. Create a variable named "letterDiv" equal to $("<div>") to hold our new div and div properties
                var letterDiv = $("<div>");
                // 2. Then give letterDiv the relevant class, attributes, and text content
                letterDiv.addClass("newLetterDiv");
                letterDiv.attr("id", ("Index" + i));
                letterDiv.attr("data-letter", ("Index" + i)); // this.mainWord[i]
                letterDiv.text("0");
                // letterDiv.text(this.mainWord[i]);
                // letterDiv.css('color', blue);
                // 3. Append our new div to "colorPicker", which will fill up with a new div each time this "for" loop executes
                currentWordDiv.append(letterDiv);
            }    
        },

        initializeGuessesRemaining: function() {
            guessesRemainingDiv.text(this.guessesRemaining);
        },

        initialize: function() {
            this.selectWord();
            this.buildWord();
            this.initializeGuessesRemaining();
        }

        // secondBuildWord: function () {
        //     wordHolder = document.getElementById('currentWord');
        //     correct = document.createElement('ul');
        
        //     for (var i = 0; i < this.mainWord.length; i++) {
        //       correct.setAttribute('id', 'my-word');
        //       guess = document.createElement('li');
        //       guess.setAttribute('class', 'guess');
        //       guess.innerHTML = "_";
        //     //   if (word[i] === "-") {
        //     //     guess.innerHTML = "-";
        //     //     space = 1;
        //     //   } else {
        //     //     guess.innerHTML = "_";
        //     //   }
        
        //     //   geusses.push(guess);
        //       wordHolder.appendChild(correct);
        //       correct.appendChild(guess);
        //     }
        //   }
    }

    gamePlay.initialize();
    // gamePlay.selectWord();
    // gamePlay.buildWord();
    // gamePlay.initializeGuessesRemaining();
    // gamePlay.secondBuildWord();

    // When the user presses a key, it will run the following function...
    document.onkeyup = function(event) {
        // Determines which key is pressed and stores it in "userGuess"
        userGuess = event.key;
        console.log(userGuess);
        console.log(gamePlay.mainWord);
        var letterCorrect = false;

        for (i=0; i<gamePlay.mainWord.length; i++) {
            console.log(gamePlay.mainWord[i]);
            if (userGuess==gamePlay.mainWord[i]) {
                letterCorrect = true;
                var currentDiv = main.find(("#Index" + i));
                console.log(currentDiv);
                currentDiv.addClass("oldLetterDiv");
                currentDiv.removeClass("newLetterDiv");
                currentDiv.text(userGuess);
            }
        }
        if (letterCorrect==false) {
            gamePlay.lettersWrong.push(userGuess);
            console.log(gamePlay.lettersWrong);
            // 1. Create a variable named "letterDiv" equal to $("<div>") to hold our new div and div properties
            var letterDiv = $("<div>");
            // 2. Then give letterDiv the relevant class, attributes, and text content
            letterDiv.addClass("oldLetterDiv");
            // letterDiv.attr("id", ("Index" + i));
            // letterDiv.attr("data-letter", ("Index" + i)); // this.mainWord[i]
            letterDiv.text(userGuess);
            // letterDiv.text(this.mainWord[i]);
            // letterDiv.css('color', blue);
            // 3. Append our new div to "colorPicker", which will fill up with a new div each time this "for" loop executes
            lettersGuessedDiv.append(letterDiv);
        }

        gamePlay.guessesRemaining = gamePlay.guessesRemaining - 1;
        guessesRemainingDiv.text(gamePlay.guessesRemaining);

        

    }



            // var excessObject {

            //     makeGuess: function (x) {
            //         this.guessesRemaining = this.guessesRemaining - 1;
            //         //if (x
            //     },

            //     guessReset: function () {
            //         this.guessesRemaining = 10;
            //     },

            //     wordBankIndexReset: function () {
            //         this.wordBankIndex = 0;
            //     },

            // }



            // Function that adds a word to an ever-growing wordBank array
            // function addWord(x) {
                // wordBank.push(x);
            // }

            // Need a validation to prevent duplicate words from being added to the wordBank array
            // Need a function to remove words from the wordBank

            // Function that updates the wins on screen
            // function updateWins() {
            //     document.querySelector("#wins").innerHTML = "Wins: " + wins;
            // }

            // function renderQuestion() {
            //     // If there are still more questions, render the next one.
            //     if (questionIndex <= (questionsArray.length - 1)) {
            //         document.querySelector("#question").innerHTML = questionsArray[questionIndex][0];
            //     }
            //     // If there aren't, render the end game screen.
            //     else {
            //         document.querySelector("#question").innerHTML = "Game Over!";
            //         document.querySelector("#score").innerHTML = "Final Score: " + score + " out of " + questionsArray.length;
            //     }
            // }


            // // MAIN PROCESS
            // // ==============================================================================

            // // Calling functions to start the game.
            // renderQuestion();
            // updateScore();


            // var userGuessHTML = document.getElementById("userGuess");

            

});