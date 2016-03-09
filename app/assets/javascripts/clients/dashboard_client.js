var dashboard_url = {
  DASH_URL: "/api/v1/apt/dashboards/",
};
var DashboardClient = {
  getDashboard: function(did, successCallback) {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: data_url.DATA_URL,
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log(status);
        console.log(error);
      }
    });
  },
  createDashboard: function(dashboard, successCallback) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: dashboard_url.DASH_URL,
      data: JSON.stringify({ dashboard: dashboard}),
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
window.DashboardClient = DashboardClient;
