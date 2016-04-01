import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';


const Header = () => (
  <Toolbar>
    <ToolbarGroup firstChild={true} float="left">
 		<FlatButton label="Create Broadcast" default={true} />
    </ToolbarGroup>
    <ToolbarGroup float="Create Post">
      <ToolbarSeparator />
      <RaisedButton label="Login" primary={true} />
    </ToolbarGroup>
  </Toolbar>
);

export default Header;