import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

class Post extends React.Component {
  
  constructor(props) {
    super(props);
    
    //this.render = this.render.bind(this);

    var self = this;
    FB.api(this.props.data.id + '/insights/post_impressions', function(response) {
                          self.setState({views: response.data[0].values[0].value});
    });

    this.state = {
      login: false,
      views: 10
    };

  }

  getPostInsights() {

  }

  render() {



    return (
          <Card>
          <CardTitle title={new Date(this.props.data.created_time).toLocaleDateString()} subtitle= {"views: " + this.state.views}/>
          <CardText children={this.props.data.message}>

          </CardText>
          <CardActions>
            <FlatButton label="Unpublish" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
    )
  }
};

export default Post;