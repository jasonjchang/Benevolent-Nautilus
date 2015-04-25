'use strict';
// Reflux
var Reflux = require('reflux');
// Router
var Router = require('react-router');

var ProgressBar = React.createClass({
  render: function(){
    var profileImg = {
      background: 'url(' + this.props.profileImg +')',
      backgroundSize: '100%',
      float: 'left',
      width: '65px',
      height: '65px'
    };
    return (
          <div className="user-progress">
            <div className="profile-circle bounceIn animated" style={ profileImg }>
            </div>
            <h4 className="title fadeIn animated">You</h4>
            <h4>{ this.props.currentSteps } / { this.props.goal }</h4>
            <span className="user-steps fadeIn animated">Total Steps</span>
          </div>
    ) 
  }
})

module.exports = ProgressBar;

