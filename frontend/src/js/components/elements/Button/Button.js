import React, { PropTypes } from 'react';

class Button extends React.Component {
  render() {
    var className = "Button";

    if (this.props.color) {
      className += " Button-Color-" + this.props.color;
    }

    if (this.props.isInline) {
      className += " Button-Inline";
    }

    if (this.props.isForm) {
      className += " Button-Form";
    }

    if (this.props.isDragIcon) {
        className += " Button-DragIcon";
    }

    return (
      <button className={className} onClick={this.props.onClick}>{this.props.text}</button>
    );
  }

};

Button.propTypes = {
    text: PropTypes.any,
    color: PropTypes.string,
    isInline: PropTypes.bool,
    isForm: PropTypes.bool
};

Button.defaultProps = {
    text: "",
    color: "Orange",
    isInline: true,
    isForm: false
};

export default Button;
