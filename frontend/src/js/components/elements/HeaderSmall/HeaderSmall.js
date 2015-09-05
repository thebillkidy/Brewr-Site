import React from 'react';
import Navigation from '../Navigation';
import Logo from '../Logo';
import './HeaderSmall.css';

class HeaderSmall extends React.Component {
  render() {
    return (
      <div className="HeaderSmall">
        <div className="HeaderSmall-container">
          <Logo />
          <Navigation className="HeaderSmall-nav" />
          <div className="clear"></div>
        </div>
      </div>
    );
  }
}

HeaderSmall.defaultProps = {

};

HeaderSmall.propTypes = {

};

export default HeaderSmall;
