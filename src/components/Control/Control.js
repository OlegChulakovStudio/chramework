import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Control.styl';

export default class Control extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    /** text near checkbox */
    label: PropTypes.string,
    /** this value is required */
    name: PropTypes.string.isRequired,
    /** callback function */
    onChange: PropTypes.func,
    /** control type. Can be 'radio' or 'checkbox' */
    type: PropTypes.string
  };

  render() {
    const { className, label, type, ...otherProps } = this.props;
    return (
      <div className={classNames([
        "Control",
        className
      ])}>
        <label className="Control__label" title={label}>
          <input
            type={type}
            className="Control__field"
            {...otherProps}
          />
          <i className={classNames([
            "Control__cover",
            { "Control__cover--radio": type && type === 'radio' }
          ])}></i>
          { label }
        </label>
      </div>
    )
  }
}