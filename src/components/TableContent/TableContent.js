import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TableContent.styl';

export default class TableContent extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
  }
  render() {
    const { className, ...otherProps } = this.props;
    return (
      <tbody className={classNames([
        "TableContent",
        className
      ])}
      {...otherProps}
      >
        {this.props.children}
      </tbody>
    );
  }
}