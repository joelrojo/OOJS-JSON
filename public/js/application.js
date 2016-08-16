var survey;

$(document).ready(function() {
  console.log("Document ready:");
  console.log(survey);

  $("input[name='surveyName']").on("blur", function() {
    if($(this).val() == "") {
      $(this).parent().parent().addClass("has-error");
      $("#error").html("Please enter a survey name").show();
    }
  });
  
  $("button[name='saveSurvey']").on("click", function(event) {
    survey = new Survey($("input[name='surveyName']").val());
    $(this).hide();
    console.log("Survey Saved:");
    console.log(survey);
  });

  


  var addQuestion = function(questionNumber){
    survey.addQuestion($("input[name='questionText" + questionNumber + "']").val());
    $(this).hide();
    console.log("Question " + questionNumber + " Saved:");
    console.log(survey);
  };

  $("button.question-button").on("click", function(event) {
    var num = $(this).data('num'); //data-num
    addQuestion(num); 
  });


  $("button[name='saveAnswer1']").on("click", function(event) {
    survey.addAnswerToQuestion(0, $("input[name='answerText1']").val());
    $(this).hide();
    console.log("Answer 1 Saved:");
    console.log(survey);
  });

  $("button[name='saveAnswer2']").on("click", function(event) {
    survey.addAnswerToQuestion(1, $("input[name='answerText2']").val());
    $(this).hide();
    console.log("Answer 2 Saved:");
    console.log(survey);
  });
  
  $("button[name='saveAnswer2b']").on("click", function(event) {
    survey.addAnswerToQuestion(1, $("input[name='answerText2b']").val());
    $(this).hide();
    console.log("Answer 2b Saved:");
    console.log(survey);
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