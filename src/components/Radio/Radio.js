import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Control from '../Control/Control.js';

export default class Radio extends Component {
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
    return <Control type="radio" {...this.props} />
  }
}