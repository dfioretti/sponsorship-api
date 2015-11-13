var Dispatcher = {
  post: function(path, params) {
    console.log('post')
    console.log(path);
    console.log(params);


    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: path,
      data: JSON.stringify(params),
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log(data);
        // return p.reject(data.responseJSON.errors);
      }
    });

  },

  get: function(path, params) {
    console.log('get')
    console.log(path);
    console.log(params);
  }
}
