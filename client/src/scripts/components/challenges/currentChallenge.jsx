'use strict';
// Router
var Router = require('react-router');
// Actions
var actions = require('../../actions/actions');

var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var CurrentChallenge = React.createClass({

  mixins: [
    require('react-router').Navigation,
    require('../../mixins/formatNumber')
  ],

  render: function(){
    var url = "#/challenges/" + this.props.uid;
    var currentSteps = this.props.currentSteps;
    var goal = this.props.goal;
    return (
        <li key={this.props.uid} className="fadeInUp animated">
          <a href={ url }>
            <div className="challenge-box">
              <div className="col-xs-4 col-md-4 line-right">
                <img src="../../../images/challenge.png" />
                <h4>{this.props.name}</h4>
              </div>
              <div className="col-xs-8 col-md-8 competition-text text-right">
                <span className="competition-score">
                  <span className="competition-accumulated">{ this.formatNumber(currentSteps) }</span> / 
                  <span className="competition-total">{ this.formatNumber(goal) }</span>
                </span>
                <span>Total Steps  |  {this.props.amountOfFriends} Players</span>
              </div>
            </div>
            <div className="row text-right">
              <button className="btn btn-lg half-width challenges-btn">Details</button>
            </div>
          </a>
        </li>
      );
  }

})

module.exports = CurrentChallenge;