import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FormGroup.styl';

export default class FormGroup extends Component {
  static propTypes = {
    /** Avaliable values ['column','row'] */
    direction: PropTypes.string,
    /** space delimited list of additional class names */
    className: PropTypes.string
  };
  static defaultProps = {
    direction: 'column'
  }
  render() {
    return (
      <div className={classNames([
        "FormGroup",
        { [`FormGroup--${this.props.direction}`]: this.props.direction },
        this.props.className
      ])}>
        { this.props.children }
      </div>
    )
  }
}