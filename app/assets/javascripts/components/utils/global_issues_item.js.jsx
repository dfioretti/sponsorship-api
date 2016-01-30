var GlobalIssuesItem = React.createClass({
  render: function () {
    return(
      <li key={this.props.item.title}>
        <div className="trend-score">{this.props.item.sentiment.toFixed(2)}</div>
        <div className="trend-text">
          <div className="trend-header">{this.props.item.title}</div>
          <div className="trend-subheader">{this.props.item.volume + ' items'}</div>
        </div>
      </li>
    )
  }
  //   var list = $.map(this.state.issues, function(item, i) {
  //     var trendCN = "trend-image ";
  //     if (item.trend === 1) {
  //       trendCN += "up";
  //     } else if (item.trend === -1) {
  //       trendCN += "down";
  //     } else {
  //       trendCN += "no-change";
  //     }

  //     return (
  //       <li key={i}>
  //         <div className="trend-score">{item.score}</div>
  //         <div className={trendCN}></div>
  //         <div className="trend-text">
  //           <div className="trend-header">{item.header}</div>
  //           <div className="trend-subheader">{item.subheader}</div>
  //         </div>
  //       </li>
  //     );
  //   });
  //   return (
  //     <div className="global-issues-list-container">
  //       <ul className="trend-list global-issues-list">
  //         {list}
  //       </ul>
  //     </div>
  //   );
  // }
});