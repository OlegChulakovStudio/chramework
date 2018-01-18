import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppLink from '../AppLink/AppLink'
import './Card.styl';

export default class Card extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    /** text or some DOM elements */
    children: PropTypes.any,
    /** If this parameter set, card will turn into link with href equal to this prop.  */
    to: PropTypes.string
  };

  static defaultProps = {
    className: '',
    to: ''
  };

  render() {
    const { className, children, to, ...rest } = this.props;
    const RenderComponent = to ? AppLink : 'div';
    return (
      <RenderComponent
        {...rest}
        to={to}
        className={classNames([
          "Card",
          {
            "Card--link": to
          },
          className
        ])}
      >
        {children}
      </RenderComponent>
    )
  }
}