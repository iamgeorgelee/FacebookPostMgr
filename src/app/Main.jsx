import React from 'react';
import Post from './components/post';
import CreatePostModal from './components/createPost'

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

class Main extends React.Component {
  

  constructor(props) {
    super(props);
    
    this.login = this.login.bind(this);

    this.state = {
      login: false,
      data:[],
      welcome: "",
      username: "Login"
    };

  }

  loadPosts(woww) {

   this.setState({login:true});
   console.log(woww)
  }

  login() {

    var self = this;

    FB.login(function(response) {


        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            console.log(response); // dump complete info
            self.setState({login:true, welcome: "Welcome", username: "George"});

            //self.state.token = response.authResponse.accessToken; //get access token
            // var user_id = response.authResponse.userID; //get FB UID

            FB.api('/silibigbug/feed', function(response) {
                console.log(response);
                var data = response.data;


                self.setState({data: data});

            })

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'public_profile,manage_pages,read_insights'
    });
  }

  render() {
    // var posts = [];
    // var data = ;
    // for (var count in data) {
    //   posts.push(<Post message = {data[count].message} />);
    // }

    return (
        <div>
        <Toolbar>
          <ToolbarGroup firstChild={true} float="left">
          { this.state.login ? <CreatePostModal /> : null}
          
          </ToolbarGroup>
          <ToolbarGroup float="right">
            <ToolbarTitle text={this.state.welcome} />
            <ToolbarSeparator />
            <RaisedButton label={this.state.username} primary={true} 
              onTouchTap={this.login}/>
          </ToolbarGroup>
        </Toolbar>
        {this.state.data.map(function(post) {
          return <div><br/> <Post data = {post} /> </div>;
        })}

        </div>

    )
  }
}



export default Main;
