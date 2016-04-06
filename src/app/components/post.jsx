import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

class Post extends React.Component {
  
  constructor(props) {
    super(props);

    //get view count through insight api
    var self = this;
    FB.api(this.props.data.id + '/insights/post_impressions', function(response) {
                          self.setState({views: response.data[0].values[0].value});
    });

    //identifiy if published
    FB.api("/" + this.props.data.id , "GET", {fields: "is_published,link"},
        function (response) {
          if (response && !response.error) {
            self.setState({data: response});
          }
        }
    );

    this.state = {
      login: false,
      views: 10,
      data: {}
    };

  }

  render() {


    var postUrl = this.state.data.id === undefined ? undefined : "https://www.facebook.com/silibigbug/posts/" + 
      this.state.data.id.substring(this.state.data.id.indexOf('_') + 1);

    return (
          <Card>
          <CardTitle title={new Date(this.props.data.created_time).toLocaleDateString()} 
            subtitle= {this.state.data.is_published == true ? "views: " + this.state.views  : "Unpublished"}/>
          <CardText children={this.props.data.message}>

          </CardText>
          <CardActions>
            {postUrl === undefined ? null : <FlatButton label="Original Post" linkButton={true}  href={postUrl}/>}
            {this.state.data.link ? <FlatButton label="Link" linkButton={true} href={this.state.data.link}/> : null}
          </CardActions>
        </Card>
    )
  }
};

export default Post;