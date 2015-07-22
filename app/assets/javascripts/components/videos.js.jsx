var Video = React.createClass({
  render: function () {
    return (

          <div className="ui card">
            <div className="image">
              <img className="vidurl" src={this.props.vidurl}></img>
            </div>
            <div className="content">
              <div className="vidtitle">
                <a className="header" ref={this.props.vidurl}>{this.props.vidtitle}</a>
              </div>
            </div>
          </div>
      );
  }
});


 
var VideoList = React.createClass({
  render: function () {
    var videoNodes = this.props.videos.map(function (video, index) {
      return (
        <Video vidurl={video.vidurl} vidtitle={video.vidtitle} key={index} />
        );
    });
 
    return (
      <div className="videoList">
        {videoNodes}
      </div>
      );
  }
});
 
var VideoBox = React.createClass({
  getInitialState: function () {
    return {videos: []};
  },
  componentDidMount: function () {
    this.loadVideosFromServer();
  },
  loadVideosFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (videos) {
        this.setState({videos: videos});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleVideoSubmit: function(video) {
    var videos = this.state.videos;
    var newVideos = videos.concat([video]);
    this.setState({videos: newVideos});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {"video": video},
      success: function(data) {
        this.loadVideosFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div className="videoBox">
        <div className="ui center aligned segment" classStyle="font-size:24px;">Video Share made with React and Rails</div>
        <VideoList videos={this.state.videos} />
        <VideoForm onVideoSubmit={this.handleVideoSubmit}/>
      </div>
      );
  }
});
 
var VideoForm = React.createClass({
  handleSubmit: function() {
    var vidurl = this.refs.vidurl.getDOMNode().value.trim();
    var vidtitle = this.refs.vidtitle.getDOMNode().value.trim();
    this.props.onVideoSubmit({vidurl: vidurl, vidtitle: vidtitle});
    this.refs.vidurl.getDOMNode().value = '';
    this.refs.vidtitle.getDOMNode().value = '';
    return false;
  },
  render: function() {
    return (
      <form className="videoForm" onSubmit={this.handleSubmit}>
      <br></br>
        <div className="ui input">
          <input type="text" placeholder="Enter a URL" ref="vidurl" />
          <input type="text" placeholder="Enter a Title" ref="vidtitle" />
        </div>
          <input className="compact ui button" type="submit" value="Post" />
      </form>
      );
  }
});
 
var ready = function () {
  React.render(
    <VideoBox url="/videos.json" />,
    document.getElementById('videos')
  );
};
 
$(document).ready(ready);