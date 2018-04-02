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
        alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
          'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
          't', 'u', 'v', 'w', 'x', 'y', 'z'],
      


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
        var validGuess = false;

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
        for (l=0; l < gamePlay.alphabet.length; l++) {
            if (userGuess == gamePlay.alphabet[l]) {
                validGuess = true;
            }
        }
        if (newGuess && validGuess) {
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











window.onload = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
          'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
          't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    var categories;         // Array of topics
    var chosenCategory;     // Selected catagory
    var getHint ;          // Word getHint
    var word ;              // Selected word
    var guess ;             // Geuss
    var geusses = [ ];      // Stored geusses
    var lives ;             // Lives
    var counter ;           // Count correct geusses
    var space;              // Number of spaces in word '-'
  
    // Get elements
    var showLives = document.getElementById("mylives");
    var showCatagory = document.getElementById("scatagory");
    var getHint = document.getElementById("hint");
    var showClue = document.getElementById("clue");
  
  
  
    // create alphabet ul
    var buttons = function () {
      myButtons = document.getElementById('buttons');
      letters = document.createElement('ul');
  
      for (var i = 0; i < alphabet.length; i++) {
        letters.id = 'alphabet';
        list = document.createElement('li');
        list.id = 'letter';
        list.innerHTML = alphabet[i];
        check();
        myButtons.appendChild(letters);
        letters.appendChild(list);
      }
    }
      
    
    // Select Catagory
    var selectCat = function () {
      if (chosenCategory === categories[0]) {
        catagoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
      } else if (chosenCategory === categories[1]) {
        catagoryName.innerHTML = "The Chosen Category Is Films";
      } else if (chosenCategory === categories[2]) {
        catagoryName.innerHTML = "The Chosen Category Is Cities";
      }
    }
  
    // Create geusses ul
     result = function () {
      wordHolder = document.getElementById('hold');
      correct = document.createElement('ul');
  
      for (var i = 0; i < word.length; i++) {
        correct.setAttribute('id', 'my-word');
        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
        if (word[i] === "-") {
          guess.innerHTML = "-";
          space = 1;
        } else {
          guess.innerHTML = "_";
        }
  
        geusses.push(guess);
        wordHolder.appendChild(correct);
        correct.appendChild(guess);
      }
    }
    
    // Show lives
     comments = function () {
      showLives.innerHTML = "You have " + lives + " lives";
      if (lives < 1) {
        showLives.innerHTML = "Game Over";
      }
      for (var i = 0; i < geusses.length; i++) {
        if (counter + space === geusses.length) {
          showLives.innerHTML = "You Win!";
        }
      }
    }
  
        // Animate man
    var animate = function () {
      var drawMe = lives ;
      drawArray[drawMe]();
    }
  
    
     // Hangman
    canvas =  function(){
  
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.strokeStyle = "#fff";
      context.lineWidth = 2;
    };
    
      head = function(){
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
      }
      
    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
      
      context.moveTo($pathFromx, $pathFromy);
      context.lineTo($pathTox, $pathToy);
      context.stroke(); 
  }
  
     frame1 = function() {
       draw (0, 150, 150, 150);
     };
     
     frame2 = function() {
       draw (10, 0, 10, 600);
     };
    
     frame3 = function() {
       draw (0, 5, 70, 5);
     };
    
     frame4 = function() {
       draw (60, 5, 60, 15);
     };
    
     torso = function() {
       draw (60, 36, 60, 70);
     };
    
     rightArm = function() {
       draw (60, 46, 100, 50);
     };
    
     leftArm = function() {
       draw (60, 46, 20, 50);
     };
    
     rightLeg = function() {
       draw (60, 70, 100, 100);
     };
    
     leftLeg = function() {
       draw (60, 70, 20, 100);
     };
    
    drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 
  
  
    // OnClick Function
     check = function () {
      list.onclick = function () {
        var geuss = (this.innerHTML);
        this.setAttribute("class", "active");
        this.onclick = null;
        for (var i = 0; i < word.length; i++) {
          if (word[i] === geuss) {
            geusses[i].innerHTML = geuss;
            counter += 1;
          } 
        }
        var j = (word.indexOf(geuss));
        if (j === -1) {
          lives -= 1;
          comments();
          animate();
        } else {
          comments();
        }
      }
    }
    
      
    // Play
    play = function () {
      categories = [
          ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
          ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
          ["manchester", "milan", "madrid", "amsterdam", "prague"]
      ];
  
      chosenCategory = categories[Math.floor(Math.random() * categories.length)];
      word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
      word = word.replace(/\s/g, "-");
      console.log(word);
      buttons();
  
      geusses = [ ];
      lives = 10;
      counter = 0;
      space = 0;
      result();
      comments();
      selectCat();
      canvas();
    }
  
    play();
    
    // Hint
  
      hint.onclick = function() {
  
        hints = [
          ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
          ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
          ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
      ];
  
      var catagoryIndex = categories.indexOf(chosenCategory);
      var hintIndex = chosenCategory.indexOf(word);
      showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
    };
  
     // Reset
  
    document.getElementById('reset').onclick = function() {
      correct.parentNode.removeChild(correct);
      letters.parentNode.removeChild(letters);
      showClue.innerHTML = "";
      context.clearRect(0, 0, 400, 400);
      play();
    }
  }
  
  
  