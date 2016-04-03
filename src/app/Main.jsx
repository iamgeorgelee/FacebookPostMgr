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
    this.openModal = this.openModal.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.loadPrevPosts = this.loadPrevPosts.bind(this);
    this.loadNextPosts = this.loadNextPosts.bind(this);

    this.state = {
      login: false,
      data:[],
      welcome: "",
      username: "Login"
    };

  }

  loadPosts() {

      var self = this;

      FB.api('/silibigbug/promotable_posts', "GET", {include_hidden: true}, function(response) {
                console.log(response);
                var data = response.data;

                self.setState({data: data, paging: response.paging});
      });
  }

  loadPrevPosts() {
    this.load(this.state.paging.previous);
  }

  loadNextPosts() {

    this.load(this.state.paging.next);
  }

  load(url = '/silibigbug/promotable_posts') {

      var self = this;

      FB.api(url, function(response) {
                console.log(response);
                var data = response.data;
                if(data.length < 1) { //
                  alert("No more posts to show!");
                } else {
                  self.setState({data: data, paging: response.paging});
                }
                
      });

  }

  login() {

    var self = this;

    FB.login(function(response) {


        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');

            FB.api('/me', function(response) {
             console.log('Good to see you, ' + response.name + '.');
             self.setState({login:true, welcome: "Welcome", username: response.name });
           });

            //self.state.token = response.authResponse.accessToken; //get access token
            // var user_id = response.authResponse.userID; //get FB UID

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'public_profile,manage_pages,read_insights,publish_pages'
    });
  }

  openModal() {
    this.refs['modal'].handleOpen();
  }

  render() {

      const style = {
        margin: 12,
      };
    return (
        <div>
        <Toolbar>
          <ToolbarGroup firstChild={true} float="left">

          { this.state.login ? <FlatButton label="New Post" onTouchTap={this.openModal} /> : null}
          { this.state.login ? <FlatButton label="All Post" onTouchTap={this.loadPosts} /> : null}

          <CreatePostModal ref="modal" callbackParent={this.loadPosts}/> 
          </ToolbarGroup>
          <ToolbarGroup float="right">

            <ToolbarSeparator />
            <RaisedButton label={this.state.username} primary={true} 
              onTouchTap={this.login}/>
          </ToolbarGroup>
        </Toolbar>
        {this.state.data.map(function(post) {
          return <div><br/> <Post data = {post} /> </div>;
        })}
        {this.state.data.length > 0 ? <div className="right_me">
          <RaisedButton label="Prev" secondary={true} style={style} 
            disabled={this.state.prevDisabled} onTouchTap={this.loadPrevPosts}/> 
          <RaisedButton label="Next" secondary={true} style={style} 
            disabled={this.state.nextDisabled} onTouchTap={this.loadNextPosts}/> 
         </div> 
        : null}

        </div>

    )
  }
}



export default Main;
