var Dispatcher = {
  post: function(path, params, successCallback) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: path,
      data: JSON.stringify(params),
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log(status);
        console.log(error);
      }
    });
  },

  apiGet: function(path, params, successCallback) {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/api/v1/teneo_api",
      data: $.extend(params, {path: path}),
      success: function(data, status, xhr) {
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log(status);
        console.log(error);
      }
    });
  }
}
