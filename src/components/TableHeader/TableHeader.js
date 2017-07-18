import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TableHeader.styl';

export default class TableHeader extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
  }
  render() {
    return (
      <thead className={classNames([
        "TableHeader",
        this.props.className
      ])}>
        {this.props.children}
      </thead>
    );
  }
}