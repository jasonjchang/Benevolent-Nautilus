// Reflux
var Reflux = require('reflux');
// Router
var Router = require('react-router');
// Store
var ChallengesStore = require('../../stores/challengesStore');
// Components
var Spinner = require('../../components/spinner');
var Header = require('../../components/Profile/Header');
var Footer = require('../../components/Profile/Footer');
var CurrentChallengeHeader = require('../../components/Challenges/CurrentChallengeHeader');
var Progress = require('../../components/Challenges/CurrentChallengeProgress');
var ChallengeTable = require('../../components/Challenges/ChallengeTable');


var SingleCurrentChallenge = React.createClass({
  mixins: [ Router.State ],

  getInitialState: function() {
    var id = this.getParams().challengeid;
    ChallengesStore.fetchSingleChallenge(id);
    return { 
        data: ChallengesStore.getSingleChallenge()
    };
  }, 

  render: function() {
    console.log(this.state.data);
    return (
      <div>
        <Header />
            < CurrentChallengeHeader name={ this.state.data.name } img="http://localhost:8080/images/challenge.png" />
            < Progress currentSteps={ this.state.data.currentSteps } goal={ this.state.data.goal } profileImg={ this.state.data.profileImg } />
            < ChallengeTable friends={ this.state.data.friends } />
        < Footer />
      </div>
    );
  }
});
module.exports = SingleCurrentChallenge;