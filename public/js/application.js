var survey;

$(document).ready(function() {

  $("input[name='surveyName']").on("blur", function() {
    if($(this).val() == "") {
      $(this).parent().parent().addClass("has-error");
      $("#error").html("Please enter a survey name").show();
    }
  });
  
  $("button[name='saveSurvey']").on("click", function(event) {
    survey = new Survey($("input[name='surveyName']").val());
    $(this).hide();
  });

  var addData = function(dataType, dataNum, selector){
    var input = selector.parent().parent().find("input"); // grab the relative input
    if (dataType == "question") {
      survey.addQuestion(input.val());
    }
    if (dataType == "answer") {
      survey.addAnswerToQuestion(dataNum-1, input.val());
    }
    console.log(input.attr('name') + " Saved:");
    console.log(survey);
    console.log("");
  };


  $("button").on("click", function(event) {
    var t = $(this),
        type = t.data('type'),
        num = t.data('num');
    addData(type, num, t);
  });
  
  $("button[name='done']").on("click", function(event) {
    console.log("Survey submitted:");
    console.log(survey);
    console.log("Survey JSON stringify:");
    console.log(JSON.stringify(survey));

    $.ajax({
      method: "POST",
      url: "/result",
      data: JSON.stringify(survey),
      done: function(response){
        console.log("done!")
      }
    });
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