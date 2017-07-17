import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TableRow.styl';

export default class TableRow extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string
  }
  render() {
    return (
      <tr className={classNames([
        "TableRow",
        this.props.className
      ])}>
        {this.props.children}
      </tr>
    );
  }
}