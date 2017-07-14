import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Radio.styl';

export default class Radio extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    /** this value is required */
    name: PropTypes.string.isRequired,
    /** this value is required and must be unique */
    id: PropTypes.string.isRequired,
    /** text near radio */
    label: PropTypes.string,
    /** callback function */
    onChange: PropTypes.func
  };

  render() {
    const { className, label, ...otherProps } = this.props;
    return (
      <div className={classNames([
        "radio",
        className
      ])}>
        <label className="radio__label" htmlFor={this.props.id} title={label}>
          <input
            type="radio"
            className="radio__field"
            {...otherProps}
          />
          <i className="radio__cover"></i>
          { label }
        </label>
      </div>
    )
  }
}