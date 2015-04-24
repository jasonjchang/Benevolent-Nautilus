var Router = require('react-router');
// Actions
var actions = require('../../actions/actions');

var Radial = require('./radial');

D3Chart = {};

D3Chart.create = function(el, state) {
  // Checks to see how far user is from daily goal.
  var goal = state.daily_goal;
  var daily = state.steps_today;

  Radial.radialProgress(el)
      .label(function() {
        if(goal-daily <= 0) {
          return "Goal has been met!";
        }
        return goal-daily + " STEPS TO GO";
      })
      .onClick(this.refresh)
      .diameter(330)
      .value(state.steps_today)
      .maxValue(state.daily_goal)
      .render();
};

D3Chart.refresh = function() {
  console.log('D3 Chart has been pressed');
  actions.updateDashboard();
  // deselect();
  // el.attr("class","selectedRadial");
};

module.exports = D3Chart;