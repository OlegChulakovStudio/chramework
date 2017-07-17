import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './Logo.styl';

export default class Logo extends Component {
  static propTypes = {
    /** Avaliable values: ['small',''] */
    size: PropTypes.string,
    /** Avaliable values: ['black',''] */
    type: PropTypes.string,
    /**  */
    url: PropTypes.string,
    /** set this param to true, if you want to add external link to http://chulakov.ru. */
    external: PropTypes.bool
  };

  static defaultProps = {
    size: '',
    type: '',
    url: '/'
  };

  renderLink() {
    return (
      <Link
        to={this.props.url}
        className={classNames([
          "logo",
          { 
            "logo--small": this.props.size === 'small',
            "logo--black": this.props.type === 'black',
          }
        ])}
      >&nbsp;</Link>
    )
  }

  renderExternalLink() {
    return (
      <a
        href={this.props.url}
        target="_blank"
        className={classNames([
          "logo",
          { 
            "logo--small": this.props.size === 'small',
            "logo--black": this.props.type === 'black',
          }
        ])}
      >&nbsp;</a>
    )
  }
  render() {
    return this.props.external ? this.renderExternalLink() : this.renderLink();
  }
}