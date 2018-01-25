import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import logo from './assets/logo.svg';
import Icon from '../Icon/Icon';
import style from './Logo.styl';

export default class Logo extends Component {

  static propTypes = {
    /** Avaliable values: ['small',''] */
    size: PropTypes.string,
    /** Avaliable values: ['black',''] */
    type: PropTypes.string,
    /**  */
    url: PropTypes.string,
    /** set this param to true, if you want to add external link */
    external: PropTypes.bool,
  };

  static defaultProps = {
    size: '',
    type: '',
    url: '/',
  };

  renderLink = () => (
    <Link
      {...this.props}
      to={this.props.url}
      className={classNames({
        [style.Logo]: true,
        [style.Logo__light]: this.props.type === 'light',
      })}>
      <Icon glyph={logo} width={120} height={28} />
    </Link>
  );

  renderExternalLink = () => (
    <a
      href={this.props.url}
      target="_blank"
      className={classNames({
        logo: true,
        'logo--small': this.props.size === 'small',
        [`logo--${this.props.type}`]: this.props.type,
      })}>
      &nbsp;
			<Icon glyph={logo} width={120} height={28} />
    </a>
  );

  render() {
    return this.props.external ? this.renderExternalLink() : this.renderLink();
  }
}
