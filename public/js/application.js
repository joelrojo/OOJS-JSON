var survey;

$(document).ready(function() {

  $("input[name='surveyName']").on("blur", function() {
    if($(this).val() == "") {
      $(this).parent().parent().addClass("has-error");
      $("#error").html("Please enter a survey name").show();
    }
  });

  var addData = function(dataType, dataNum, selector){
    var input = selector.parent().parent().find("input"); // grab the relative input
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
    selector.hide();

    // logging for clarification
    console.log(input.attr('name') + " Saved:");
    console.log(survey);
    console.log("");
  };

  // click event handler scaled to all buttons
  $("button").on("click", function(event) {
    var t = $(this),
        type = t.data('type'),
        num = t.data('num');

    addData(type, num, t);
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