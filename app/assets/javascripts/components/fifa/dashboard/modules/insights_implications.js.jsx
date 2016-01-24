var InsightsImplications = React.createClass({
  getInitialState: function() {
    // return {scrollLoaded: false, insights: [
    //   {
    //     id: 12,
    //     company_id: 12,
    //     attachment_name: '50998.xlsx',
    //     attachment: 'http://s3.amazonaws.com/artatlas/painting/images/large/50998.jpg?1423600554',
    //     body: 'this is a test body',
    //     user: {
    //       name: 'James Dunbar'
    //     }
    //   },
    //   {
    //     id: 13,
    //     company_id: 12,
    //     attachment_name: '50998.jpg',
    //     attachment: 'http://s3.amazonaws.com/artatlas/painting/images/large/50998.jpg?1423600554',
    //     body: 'this is a test body',
    //     user: {
    //       name: 'James Dunbar'
    //     }
    //   },
    //   {
    //     id: 14,
    //     company_id: 12,
    //     attachment_name: '50998.jpg',
    //     attachment: 'http://s3.amazonaws.com/artatlas/painting/images/large/50998.jpg?1423600554',
    //     body: 'this is a test body',
    //     user: {
    //       name: 'James Dunbar'
    //     }
    //   },
    //   {
    //     id: 15,
    //     company_id: 12,
    //     attachment_name: '50998.pdf',
    //     attachment: 'http://s3.amazonaws.com/artatlas/painting/images/large/50998.jpg?1423600554',
    //     body: 'this is a test body',
    //     user: {
    //       name: 'James Dunbar'
    //     }
    //   },
    //   {
    //     id: 16,
    //     company_id: 12,
    //     attachment_name: '50998.docx',
    //     attachment: 'http://s3.amazonaws.com/artatlas/painting/images/large/50998.jpg?1423600554',
    //     body: 'this is a test body',
    //     user: {
    //       name: 'James Dunbar'
    //     }
    //   },
    //   {
    //     id: 17,
    //     company_id: 12,
    //     attachment_name: '50998.doc',
    //     attachment: 'http://s3.amazonaws.com/artatlas/painting/images/large/50998.jpg?1423600554',
    //     body: 'this is a test body',
    //     user: {
    //       name: 'James Dunbar'
    //     }
    //   },
    //   {
    //     id: 18,
    //     company_id: 12,
    //     attachment_name: '50998.ppt',
    //     attachment: 'http://s3.amazonaws.com/artatlas/painting/images/large/50998.jpg?1423600554',
    //     body: 'this is a test body',
    //     user: {
    //       name: 'James Dunbar'
    //     }
    //   }
    // ]};
    return {scrollLoaded: false, insights: InsightsStore.getState().insights};
  },
  renderList: function () {
    var insights = $.map(this.state.insights, function(item) {
      return (<InsightListItem key={item.id} item={item} />);
    });
    return (
      <div className="media-list-container">
        <ul className="text-list media-list">
          {insights}
        </ul>
      </div>
    );
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="insights_implications" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Insights & Implications</div>
        </div>
        <div className="main">
          {this.renderList()}
          <NotableForm company_id={this.props.company_id} saveHandler={this.createNote} validateBody={true} />
        </div>
      </div>
    );
  },
  componentDidMount: function () {
    // refactor to use this.getDOMNode()
    if (!this.state.scrollLoaded) {
      $('#insights_implications .media-list-container').jScrollPane();
      this.setState({scrollLoaded: true});
    } else if (this.state.wait) {
      if (typeof($('#insights_implications .media-list-container').data('jsp')) == "undefined") {
        $('#insights_implications .media-list-container').jScrollPane();
        this.setState({scrollLoaded: true});
      }
      this.setState({wait: false});
    } else {
      $('#insights_implications .media-list-container').data('jsp').destroy();
      $('#insights_implications .media-list-container').jScrollPane();
      $('#insights_implications .media-list-container').data('jsp').addHoverFunc();
    }
  }
});
