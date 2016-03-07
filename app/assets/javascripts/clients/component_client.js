var url = {
  COMPONENT_URL: "/api/v1/apt/components/",
}


var ComponentClient = {
  createComponent: function(component, successCallback) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: url.COMPONENT_URL,
      data: JSON.stringify({ component: component }),
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log(status);
        console.log(error);
      }
    });
  },
  updateComponent: function(component, successCallback) {
    $.ajax({
      type: "PUT",
      contentType: "application/json",
      url: url.COMPONENT_URL + component.id,
      data: JSON.stringify({ component: component }),
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log(status);
        console.log(error)
      }
    });
  },
  viewComponent: function(cid, failure) {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: url.COMPONENT_URL + cid,
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log(status);
        console.log(error);
      }
    });
  }

};
