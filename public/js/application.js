var survey;

$(document).ready(function() {

  var addData = function(dataType, dataNum, input){
    if (dataType == "question") {
      survey.addQuestion(input.val());
    }
    if (dataType == "answer") {
      survey.addAnswerToQuestion(dataNum-1, input.val());
    }
    if (dataType == "survey") {
      survey = new Survey(input.val());
    }
    if (dataType == "done") {
      $.ajax({
        method: "POST",
        url: "/result",
        data: JSON.stringify(survey),
        done: function(response){
          console.log("done!")
        }
      });
    }

    // logging for clarification
    console.log(input.attr('name') + " Saved:");
    console.log(survey);
    console.log("");
  };  

  // blur event handler scaled to all inputs
  $("input").on("blur", function() {
    var input = $(this);
    
    if(input.val() == "") {
      input.parent().parent().addClass("has-error");
      $("#error").html("Please enter text for the field highlighted below").show();
    }
    else {
      var dataType = input.data('type'),
          dataNum = input.data('num');
      addData(dataType, dataNum, input);
    }
  });

}); // end doc.ready

// Survey Object
var Survey = function(name) {
  this.name = name;
  this.questions = [];
}

Survey.prototype.addQuestion = function(questionText) {
  this.questions.push(new Question(questionText));
};

Survey.prototype.addAnswerToQuestion = function(questionNumber, answerText) {
  this.questions[questionNumber].addAnswer(answerText);
};

// Question Object
var Question = function(text) {
  this.text = text;
  this.answers = [];

  this.addAnswer = function(answerText) {
    this.answers.push(new Answer(answerText));
  }
}

// Answer Object
var Answer = function(text) {
  this.text = text;
}