/**
@fileOverview 
<p>Fitbit.js - Component for Fitbit </p>
@author Jason Chang, Scott Kao, Derek Van Dyk, Dennis Yang
*/
'use strict';
// Reflux
var Reflux = require('reflux');
// Router
var Router = require('react-router');
// Actions
var actions = require('../../actions/actions');
// Components
var Spinner = require('../spinner');

/**
@description Class Dedicated to Fitbits API requests while rendering a button.
@class Fitbit
*/
var Fitbit = React.createClass({
  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      // error message - set default blank
      error: '',
      // submitted set to false, this is purely for the spinner
      submitted: false
    };
  },

  connectFitbit: function(e) {
    e.preventDefault();
    var self = this;
    console.log('setup fitbit');
    self.transitionTo('login');
  },

  // Function is built for error messages.  
  onErrorMessage: function(errorMessage) {
    this.refs.submit.getDOMNode().disabled = false;
    this.setState({
      error: errorMessage,
      submitted: false
    });
  },

  render: function() {
    var error = this.state.error ? <div className="error login-error">{ this.state.error }</div> : '';
    return (
      <div className="text-center">
        <button className="button button-primary" onClick={ this.connectFitbit }>
           { this.state.submitted ? <Spinner /> : 'Connect Fitbit' }
        </button>
        { error }
      </div>
    );
  }
});

module.exports = Fitbit;