import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TableHead.styl';

export default class TableHead extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
  }
  render() {
    return (
      <thead className={classNames([
        "TableHead",
        this.props.className
      ])}>
        {this.props.children}
      </thead>
    );
  }
}