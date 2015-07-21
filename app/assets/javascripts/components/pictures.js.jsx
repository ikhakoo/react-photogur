var Picture = React.createClass({
  render: function () {
    return (
      <div className="pictitle">
        <h2> {this.props.pictitle} </h2>
        <img className="picurl" src={this.props.picurl}></img>
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
        <h1>Pictures</h1>
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
        <input type="text" placeholder="Enter a URL" ref="picurl" />
        <input type="text" placeholder="Enter a Title" ref="pictitle" />
        <input type="submit" value="Post" />
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