import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Table.styl';

export default class Table extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
  }
  render() {
    const { className, ...otherProps } = this.props;
    return (
      <table 
        className={classNames([
          "Table",
          className
        ])}
        cellPadding={0}
        cellSpacing={0}
        { ...otherProps }
      >
        {this.props.children}
      </table>
    );
  }
}