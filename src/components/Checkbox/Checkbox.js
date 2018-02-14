import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Control from '../Control/Control';

export default class Checkbox extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    /** text near checkbox */
    label: PropTypes.string,
    /** this value is required */
    name: PropTypes.string.isRequired,
    /** callback function */
    onChange: PropTypes.func
  };

  render() {
    return <Control {...this.props} type="checkbox" />
  }
}