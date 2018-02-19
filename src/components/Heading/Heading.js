import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Heading.styl';

export default class Heading extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    /** heading level. Values from 1 to 5 are avaliable */
    level: PropTypes.number,
    /** must be a valid tag name */
    tagName: PropTypes.string,
    /** text or some DOM elements */
    children: PropTypes.any
  };

  static defaultProps = {
    level: 1,
  }
  render() {
    const { className, level, tagName, children, ...rest } = this.props;
    const RenderedComponent = tagName ? tagName : 'h' + level;
    return (
      <RenderedComponent {...rest} className={classNames([
        "Heading",
        { [`Heading--level-${level}`]: level },
        className
      ])}>
        {children}
      </RenderedComponent>
    )
  }
}