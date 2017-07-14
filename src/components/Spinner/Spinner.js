import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Spinner.styl';

export default class Spinner extends PureComponent {
  static propTypes = {
     /** space delimited list of additional class names */
    className: PropTypes.string
  };

  render() {
    return (
      <i className={"spinner " + this.props.className }></i>
    )
  }
}