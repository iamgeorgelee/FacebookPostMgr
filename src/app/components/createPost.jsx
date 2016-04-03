import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import TextField from 'material-ui/lib/text-field';

import Checkbox from 'material-ui/lib/checkbox';

export default class CreatePostModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.savePost = this.savePost.bind(this);
    this.checkEmpty = this.checkEmpty.bind(this);

    this.state = {
      open: false,
      isEmpty: true
    };
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose () {
    console.log(this.refs['checkbox'].isChecked());
    this.setState({open: false});
  }

  savePost () {
    
    var message = this.refs['text'].getValue();
    var checkbox = this.refs['checkbox'].isChecked();
    var self = this;
    
    FB.api('/me/accounts', function(response) {
          console.log(response);
          var pageToken = response.data[0].access_token;

              FB.api(
                "/silibigbug/feed",
                "POST",
                {
                    "message": message, 
                    "access_token" : pageToken,
                    "published" : checkbox
                },
                function (response) {
                  if (response && !response.error) {
                    /* handle the result */

                    self.handleClose();
                    self.props.callbackParent();
                  } else {
                    console.log(response.error);
                  }
                }
              );

    })
    
  }

  checkEmpty(event) {
      
    if(event.target.value && event.target.value.length > 0) {
       this.setState({isEmpty:false})
    } else {
        this.setState({isEmpty:true})
    }

  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.state.isEmpty}
        onTouchTap={this.savePost}
      />,
    ];

    return (
      <div>
        
        <Dialog
          title="Create New Post"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
              <TextField
                ref = "text"
                floatingLabelText="what's up"
                multiLine={true}
                rows={2}
                onChange={this.checkEmpty}
              />
        <Checkbox label="Published" defaultChecked={true} ref= "checkbox" />
        </Dialog>
      </div>
    );
  }
}