var $ = jQuery;
var Reflux = require('reflux');
var actions = require('../../actions/actions');
var Reactable = require('reactable'),
    Table = Reactable.Table,
    Tr = Reactable.Tr,
    Td = Reactable.Td;


var Friends = React.createClass({
  
  mixins: [
    require('react-router').Navigation,
  ],

  // When the View loads up, get the data from the Store
  componentDidMount: function() {
  },
  // When there is a change in the store, the method recieves an updated note list and changes the state. 
  onChange: function(friends) {
    this.setState({
    });
  },

  requestFriendRequest: function(email){
    // console.log(email);
    actions.sendFriendRequest(email);
  },

  componentDidMount: function() {
    // when the component mounts we start listening to profileStore's 
    // change event.  This is broadcast whenever there is a mutation in the notes lists
    // the following line registers as a listener.
    // var $inputField = 
    var that = this;
    $(".reactable-filter-input").after("<button class='add-friend btn btn-primary btn-lg outline full-width top-bottom-margin'>Send Friend Request</button>");
    // console.log('input field', $inputField);
    var $addFriend = $(".add-friend");
    $('.reactable-filter-input').keyup(function(){
      var $rowCount = $('.search-tr').length;
      if($rowCount === 0){
        $addFriend.fadeIn(500);
      } else {
        $addFriend.fadeOut(500);
      }
    });
    $addFriend.click(function() {
      var $friendValue = $(".reactable-filter-input").val();
      that.requestFriendRequest($friendValue);
    });
  },

  componentWillUnmount: function() {
    // this will remove the listener.
    // will always stay up-to-date by listening to the Store's change event
  },

  render: function() {
    return (
      <div className="table-responsive search-friends table-hover" >
        <Table className="table table-hover" id="table" filterable={ ['Name'] }>
            { this.props.data.map(function(friend){
              var profileImage = { 
                        "background": 'url(' + friend.img + ')',
                        "backgroundSize": "100%"
                      };
              var userSteps = (
                          <span>
                            { friend.steps }
                          </span>
                      );
              return (
                  <Tr className="search-tr" >
                      <Td column="">
                        <div className="profile-circle" style={ profileImage }>
                        </div>
                      </Td>
                      <Td column="Name">
                        { friend.name }
                      </Td>
                      <Td column="Steps">
                        <span className="friends-steps">
                          { friend.steps }
                        </span>
                      </Td>
                  </Tr>
              )
            })}
        </Table>
      </div>
    );
  }
});

module.exports = Friends;