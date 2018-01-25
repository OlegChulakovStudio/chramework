import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import reactHtmlParser from 'react-html-parser';
import arrowIcon from './icons/arrow-link.svg';
import './Button.styl';

class Button extends Component {
  static propTypes = {
    /** if set to true, button will display in an active state */
    active: PropTypes.bool,
    /** space delimited list of additional class names */
    className: PropTypes.string,
    /** whether action is non-active */
    disabled: PropTypes.bool,
    /** visual intent color to apply to element. Avaliable values: ['secondary', 'success', 'danger'] */
    intent: PropTypes.string,
    /** sets the button size. Avaliable values are: ['small'] */
    size: PropTypes.string,
    /** action text */
    text: PropTypes.any,
    /** If this parameter set, button will turn into link with href equal to this prop.  */
    to: PropTypes.string,
    href: PropTypes.string,
    /** If this parameter set, button will turn into link with href equal to this prop.  */
    bordered: PropTypes.bool,
    arrow: PropTypes.bool,
    /** HTML 'type' attribute of button. Common values are 'button' and 'submit'. Note that this prop has no effect if 'to' was set */
    type: PropTypes.string,
    /** click event handler */
    onClick: PropTypes.func,
    white: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    white: false,
    disabled: false,
    intent: '',
    size: '',
    text: '',
    to: '',
    href: '',
    bordered: false,
    arrow: false,
    type: 'button',
    onClick: () => { },
  };
  state = {
    active: false,
  };
  onTouchStart = () => {
    this.setState({ active: true });
  };
  onTouchStart = () => {
    this.setState({ active: false });
  };
  render() {
    const RenderedComponent =
      !this.props.to && !this.props.href ? 'button' : this.props.href ? 'a' : Link;
    const { bordered, intent, disabled, white, size, arrow, className } = this.props;
    return (
      <RenderedComponent
        className={classNames([
          'Button',
          {
            'Button--active': this.state.active,
            'Button--bordered': bordered,
            'Button--arrow': arrow,
            [`Button--${intent}`]: intent,
            'Button--disabled': disabled,
            'Button--white': white,
            [`Button--${size}`]: size,
          },
          className,
        ])}
        to={this.props.to}
        href={this.props.href}
        disabled={this.props.disabled}
        type={this.props.type}
        onTouchCancel={this.onTouchEnd}
        onTouchEnd={this.onTouchEnd}
        onTouchStart={this.onTouchStart}
        onClick={this.props.onClick}>
        <span className="Button__inner">
          <span className="Button__text">{reactHtmlParser(this.props.text)}</span>
          {this.props.arrow && <Icon glyph={arrowIcon} className="Button__arrow" />}
        </span>
      </RenderedComponent>
    );
  }
}

export default Button;
