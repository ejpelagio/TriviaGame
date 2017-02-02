var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question: "How many super bowls have the New England Patriots won?",
  answers: [1, 2, 3, 4],
  correctAnswer: 4,
  image: "assets/images/patriotssuperbowls.jpg"
}, {
  question: "Which NBA coach holds the most NBA Championships?",
  answers: ["Red Auerbach", "Phil Jackson", "Gregg Popovich", "Pat Riley"],
  correctAnswer: "Phil Jackson",
  image: "assets/images/Philljackson.jpg"
}, {
  question: "What team does Christiano Ronaldo play for?",
  answers: ["Manchester United", "Real Madrid", "Atletico De Madrid", "Barcelona"],
  correctAnswer: "Real Madrid",
  image: "assets/images/ronaldo.jpg"
}, {
  question: "What was Michael Jordan's nickname after his incredible slam dunk in the All-Star Game in 1987?",
  answers: ["Jumpman Jordan", "Air Jordan", "The Goat", "Mikey"],
  correctAnswer: "Air Jordan",
  image: "assets/images/airjordan.jpg"
}, {
  question: "Which was the only team to win two World Series in the 1980s?",
  answers: ["The Houston Astros", "The Chicago Cubs", "The New York Yankees", "The Los Angeles Dodgers"],
  correctAnswer: "The Los Angeles Dodgers",
  image: "assets/images/dodgers.jpeg"
}, {
  question: "What pitcher holds the record for most complete games in an MLB career?",
  answers: ["Nolan Ryan", "Sammy Sosa", "CY Young", "Roy Halladay"],
  correctAnswer: "CY Young",
  image: "assets/images/cyYoung.jpg"
}, {
  question: "In 2013, Who set the NBA record for the MOST 3-pointers made in a season with how many?",
  answers: ["Steph Curry", "Kevin Durant", "Kawhi Leonard", "Clay Thompson"],
  correctAnswer: "Steph Curry",
  image: "assets/images/stephcurry.jpeg"
},
 {
  question: "What NBA Player is better known for his nickname 'White Chocolate'?",
  answers: ["Tim Duncan", "Pau Gasol", "Manu Ginobli", "Jason Williams"],
  correctAnswer: "Jason Williams",
  image: "assets/images/whitechocolate.jpeg"
},
{
  question: "What team did Texas defeat for the 2005 National Title (in the 2006 Rose Bowl)?",
  answers: ["Florida", "LSU", "Alabama", "USC"],
  correctAnswer: "USC",
  image: "assets/images/usc.jpeg    "
},
 {
  question: "Which Quarterback in the NFL holds the NFL record for the most Super Bowl appearances?",
  answers: ["Tom Brady", "Joe Montana", "John Elway", "Terry Bradshaw"],
  correctAnswer: "Tom Brady",
  image: "assets/images/tombrady.jpeg"
}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    panel.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").html(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});