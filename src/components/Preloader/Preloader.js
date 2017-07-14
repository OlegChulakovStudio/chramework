import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '../../index.js';
import './Preloader.styl';

export default class Preloader extends PureComponent {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string
  };

  render() {
    return (
      <div className={"preloader " + this.props.className }>
        <Spinner />
      </div>
    );
  }
}