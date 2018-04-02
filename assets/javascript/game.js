$(document).ready(function () {

    // Define our initial variables, including "wins", "losses", "word array", and an empty variable for the user's letter guess
    var wins = 0;
    var losses = 0;
    var wordBank = ["jedi","sith","empire","deathstar","force","skywalker","yoda","luke","stormtrooper","leia","chewbacca","tatooine","naboo","alderaan","coruscant","droid","clone","dooku"];
    // var wordBank = ["jedi","sith","Empire","Deathstar","Force","melon", "city", "square", "pop"];
    var userGuess;

    var main = $("body");
    var currentWordDiv = main.find("#currentWord");
    var lettersGuessedDiv = main.find("#lettersGuessed");
    var guessesRemainingDiv = main.find("#guessesRemaining");
    var winsDiv = main.find("#winsPanel");
    var lossesDiv = main.find("#lossesPanel");

    // Gets Link for Theme Song - Sound from http://www.soundboard.com/sb/sound/657
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/star-wars-theme.mp3");

    // Theme Button
    $("#musicControls").on("click", ".theme-button", function() {
      audioElement.play();
    }).on("click", ".pause-button", function() {
      audioElement.pause();
    });


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
        allLowercaseLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"],
      


        selectWord: function () {
            this.wordBankIndex = Math.floor(Math.random() * wordBank.length);
            console.log(this.wordBankIndex);
            this.mainWordString = wordBank[this.wordBankIndex];
            for (i = 0; i < this.mainWordString.length; i++) {
                this.mainWord[i] = this.mainWordString.charAt(i);
            }
        },

        // Build out our list of words, each in a different color
        // (1) Loop through all colors in the array
        // (2) Create element to hold word
        // (3) Populate that element with a word from our "word" array
        // (4) Make the word a random color from our "text color" array
        buildWord: function () {
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

        initializeGameVariables: function () {
            this.guessesRemaining = 10;
            this.lettersCorrect = [];
            this.lettersWrong = [];
            this.mainWord = [];
            this.mainWordString = "";
            this.wordBankIndex = 0;
        },

        initializeGuessesRemainingDiv: function () {
            guessesRemainingDiv.text(this.guessesRemaining);
            winsDiv.text(wins);
            lossesDiv.text(losses);
        },

        initialize: function () {
            this.initializeGameVariables();
            this.selectWord();
            this.buildWord();
            this.initializeGuessesRemainingDiv();

        }
    }

    gamePlay.initialize();
    // gamePlay.selectWord();
    // gamePlay.buildWord();
    // gamePlay.initializeGuessesRemaining();
    // gamePlay.secondBuildWord();

    // When the user presses a key, it will run the following function...
    document.onkeyup = function (event) {
        // Determines which key is pressed and stores it in "userGuess"
        userGuess = event.key;
        console.log(userGuess);
        console.log(gamePlay.mainWord);
        var letterCorrect = false;
        var newGuess = true;

        // Evaluate whether a guess is a new guess or not
        for (j = 0; j < gamePlay.lettersCorrect.length; j++) {
            if (userGuess == gamePlay.lettersCorrect[j]) {
                newGuess = false;
            }
        }
        for (k = 0; k < gamePlay.lettersWrong.length; k++) {
            if (userGuess == gamePlay.lettersWrong[k]) {
                newGuess = false;
            }
        }
        if (newGuess) {
            for (i = 0; i < gamePlay.mainWord.length; i++) {
                console.log(gamePlay.mainWord[i]);
                if (userGuess == gamePlay.mainWord[i]) {
                    letterCorrect = true;
                    var currentDiv = main.find(("#Index" + i));
                    console.log(currentDiv);
                    currentDiv.addClass("oldLetterDiv");
                    currentDiv.removeClass("newLetterDiv");
                    currentDiv.text(userGuess);

                    gamePlay.lettersCorrect.push(userGuess);
                }
            }
            if (letterCorrect == false) {
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
                gamePlay.lettersWrong.push(userGuess);
                gamePlay.guessesRemaining = gamePlay.guessesRemaining - 1;
            }
        }

        // gamePlay.guessesRemaining = gamePlay.guessesRemaining - 1;
        guessesRemainingDiv.text(gamePlay.guessesRemaining);

        var restartGame = false;
        setTimeout(function () {
            if (gamePlay.lettersCorrect.length == gamePlay.mainWord.length) {
                wins = wins + 1;
                alert("You Win!");
                restartGame = confirm("Would you like to play another game?");
            }
            if (gamePlay.guessesRemaining == 0) {
                losses = losses + 1;
                alert("You Lose! Correct answer was '" + gamePlay.mainWordString + "'");
                restartGame = confirm("Would you like to play another game?");
            }
            if (restartGame) {
                currentWordDiv.empty();
                lettersGuessedDiv.empty();
                gamePlay.initialize();
            }
        }, 10);
    }
});