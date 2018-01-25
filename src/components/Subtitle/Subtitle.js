import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Subtitle.styl';

export default class Subtitle extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    /** text or some DOM elements */
    children: PropTypes.any
  };
  render() {
    const { className, children } = this.props;
    return (
      <p className={classNames([
        "Subtitle",
        className
      ])}>
        {children}
      </p>
    )
  }
}