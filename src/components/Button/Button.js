import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Button.styl';

export default class Button extends Component {
  static propTypes = {
    /** if set to true, button will display in an active state */
    active: PropTypes.bool,
    /** space delimited list of additional class names */
    className: PropTypes.string,
    /** whether action is non-active */
    disabled: PropTypes.bool,
    /** visual intent color to apply to element. Avaliable values: ['secondary', 'success', 'danger'] */
    indent: PropTypes.string,
    /** sets the button size. Avaliable values are: ['small'] */
    size: PropTypes.string,
    /** action text */
    text: PropTypes.string,
    /** If this parameter set, button will turn into link with href equal to this prop.  */
    to: PropTypes.string,
    /** HTML 'type' attribute of button. Common values are 'button' and 'submit'. Note that this prop has no effect if 'to' was set */
    type: PropTypes.string,
    /** click event handler */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    active: false,
    className: '',
    dark: false,
    disabled: false,
    indent: '',
    size: '',
    text: '',
    to: '',
    type: 'button',
    onClick: () => {}
  };

  render() {
    const RenderedComponent = this.props.to ? Link : 'button';
    return(
      <RenderedComponent 
        className={classNames([
          "button",
          {
            "button--active": this.props.active,
            [`button--${this.props.indent}`]: this.props.indent,
            "button--disabled": this.props.disabled,
            [`button--${this.props.size}`]: this.props.size
          },
          this.props.className
        ])}
        disabled={this.props.disabled}
        type={this.props.type}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </RenderedComponent>
    )
  }
}