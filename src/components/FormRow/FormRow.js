import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FormRow.styl';

export default class FormRow extends Component {
  static propTypes = {
    /** content align. Avaliable values ['left', 'right', 'justify'] */
    align: PropTypes.string,
    /** space delimited list of additional class names */
    className: PropTypes.string
  };
  static defaultProps = {
    align: 'left'
  }
  render() {
    return (
      <div className={classNames([
        "form-row",
        { [`form-row--${this.props.align}`]: this.props.align },
        this.props.className
      ])}>
        { this.props.children }
      </div>
    )
  }
}