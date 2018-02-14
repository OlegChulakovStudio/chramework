import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reactHtmlParser from 'react-html-parser';
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
    const { className, label, type, complexLabel, ...otherProps } = this.props;
    return (
      <label className={classNames([ "Control", className, {
        [`Control_${type}`]: type
      } ])} title={label}>
        <input
          {...otherProps}
          type={type}
          className="Control__field"
        />
        <span className="Control__caption">{complexLabel || reactHtmlParser(label)}</span>
      </label>
    )
  }
}
