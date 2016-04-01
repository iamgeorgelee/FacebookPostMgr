'use strict';

import React from 'react';
import FacebookLogin from 'react-facebook-login';

class LoginBtn extends React.Component {
  constructor(props) {
      super(props);
  };

  responseFacebook = (response) => {
    console.log(response);
  };

  render() {
    return (
      <FacebookLogin
        appId="1529445987352185"
        autoLoad={true}
        callback={responseFacebook} />
    )
  }
}

export default LoginBtn;