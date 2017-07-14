import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Checkbox.styl';

export default class Checkbox extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    /** this value is required */
    name: PropTypes.string.isRequired,
    /** this value is required and must be unique */
    id: PropTypes.string.isRequired,
    /** text near checkbox */
    label: PropTypes.string,
    /** callback function */
    onChange: PropTypes.func
  };

  render() {
    const { className, label, ...otherProps } = this.props;
    return (
      <div className={classNames([
        "checkbox",
        className
      ])}>
        <label className="checkbox__label" htmlFor={this.props.id} title={label}>
          <input
            type="checkbox"
            className="checkbox__field"
            {...otherProps}
          />
          <i className="checkbox__cover"></i>
          { label }
        </label>
      </div>
    )
  }
}