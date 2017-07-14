import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Logo.styl';

export default class Logo extends Component {
  static propTypes = {
    /** Avaliable values: ['small',''] */
    size: PropTypes.string,
    /** Avaliable values: ['black',''] */
    type: PropTypes.string
  };

  static defaultProps = {
    size: '',
    type: ''
  };

  render() {
    return (
      <a className={classNames([
        "logo",
        { 
          "logo--small": this.props.size === 'small',
          "logo--black": this.props.type === 'black',
        }
      ])} href="http://chulakov.ru/">&nbsp;</a>
    )
  }
}