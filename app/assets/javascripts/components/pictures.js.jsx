var Picture = React.createClass({
  render: function () {
    return (

          <div className="ui card">
            <div className="image">
              <img className="picurl" src={this.props.picurl}></img>
            </div>
            <div className="content">
              <div className="pictitle">
                <a className="header" ref={this.props.picurl}>{this.props.pictitle}</a>
              </div>
            </div>
          </div>
      );
  }
});


 
var PictureList = React.createClass({
  render: function () {
    var pictureNodes = this.props.pictures.map(function (picture, index) {
      return (
        <Picture picurl={picture.picurl} pictitle={picture.pictitle} key={index} />
        );
    });
 
    return (
      <div className="pictureList">
        {pictureNodes}
      </div>
      );
  }
});
 
var PictureBox = React.createClass({
  getInitialState: function () {
    return {pictures: []};
  },
  componentDidMount: function () {
    this.loadPicturesFromServer();
  },
  loadPicturesFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (pictures) {
        this.setState({pictures: pictures});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePictureSubmit: function(picture) {
    var pictures = this.state.pictures;
    var newPictures = pictures.concat([picture]);
    this.setState({pictures: newPictures});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {"picture": picture},
      success: function(data) {
        this.loadPicturesFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div className="pictureBox">
        <div className="ui center aligned segment" classStyle="font-size:24px;">Photo Share made with React and Rails</div>
        <PictureList pictures={this.state.pictures} />
        <PictureForm onPictureSubmit={this.handlePictureSubmit}/>
      </div>
      );
  }
});
 
var PictureForm = React.createClass({
  handleSubmit: function() {
    var picurl = this.refs.picurl.getDOMNode().value.trim();
    var pictitle = this.refs.pictitle.getDOMNode().value.trim();
    this.props.onPictureSubmit({picurl: picurl, pictitle: pictitle});
    this.refs.picurl.getDOMNode().value = '';
    this.refs.pictitle.getDOMNode().value = '';
    return false;
  },
  render: function() {
    return (
      <form className="pictureForm" onSubmit={this.handleSubmit}>
      <br></br>
        <div className="ui input">
          <input type="text" placeholder="Enter a URL" ref="picurl" />
          <input type="text" placeholder="Enter a Title" ref="pictitle" />
        </div>
          <input className="compact ui button" type="submit" value="Post" />
      </form>
      );
  }
});
 
var ready = function () {
  React.render(
    <PictureBox url="/pictures.json" />,
    document.getElementById('pictures')
  );
};
 
$(document).ready(ready);