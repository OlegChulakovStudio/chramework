import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  static propTypes = {
    /** link */
    to: PropTypes.string,
    /** link text */
    children: PropTypes.any
  };

  static defaultProps = {
    to: ''
  };

  render() {
    const { to, children, ...rest } = this.props;
    let RenderedComponent;
    let path;
    if (to.indexOf('//') < 0) {
      RenderedComponent = Link;
      path = { to: to };
    } else if (to.indexOf('://') >= 0 || to.indexOf('//') === 0) {
      RenderedComponent = 'a';
      path = { href: to };
    }

    return (
      <RenderedComponent {...rest} {...path}>
        {children}
      </RenderedComponent>
    )
  }
}