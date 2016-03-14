var score_url = {
  SCORE_URL: "/api/v1/apt/scores",
};

var ScoreClient = {
  getScores: function(successCallback) {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: score_url.SCORE_URL,
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log(status);
        console.log(error);
      }
    });
  },
  createScore: function(score, successCallback) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: score_url.SCORE_URL,
      data: JSON.stringify({ score: score }),
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log(status);
        console.log(error);
      }
    });
  }
}
