import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FormCol.styl';

export default class FormCol extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    /** size of current column. Avaliable values ['small','medium','large']. Small column fills 33% of parent container, medium column - 45%, large - 60%. By default, column fills full width of parent container.  */
    size: PropTypes.string
  };

  render() {
    return (
      <div className={classNames([
        "FormCol",
        { [`FormCol--${this.props.size}`]: this.props.size }
      ])}>
        { this.props.children }
      </div>
    )
  }
}