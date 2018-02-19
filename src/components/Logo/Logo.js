import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'react-router-dom/Link';
import LogoIcon from './assets/logo.svg';
import reactHtmlParser from "react-html-parser";
// import Icon from '../Icon/Icon';
import './Logo.styl';

export default class Logo extends Component {

  static propTypes = {
    /** Avaliable values: ['small',''] */
    size: PropTypes.string,
    /** Avaliable values: ['light',''] */
    mod: PropTypes.string,
    /** Avaliable values: ['black',''] */
    type: PropTypes.string,
    /**  */
    url: PropTypes.string,
    /** set this param to true, if you want to add external link */
    external: PropTypes.bool,
    /** set this param to true, if you want to add text after logo */
    text: PropTypes.string,
    /** set this param to true, if you want to add text after logo */
    subline: PropTypes.string,
  };

  static defaultProps = {
    size: '',
    mod: '',
    type: '',
    text: '',
    subline: '',
    url: '/',
  };

  render() {
    const { url, mod, size, type, external, className, text, subline, ...rest } = this.props;
    const LinkComponent = this.props.external ? 'a' : Link;
    const linkProps = {
      [external ? 'href' : 'to']: url
    };
    if (external) {
      linkProps.target = '_blank';
    }
    return <div {...rest} className={classNames([
          "Logo",
          className,
          {
            [`Logo--${size}`]: size,
            [`Logo--${type}`]: type,
            [`Logo--${mod}`]: mod,
            [`Logo--withsubline`]: subline
          }
        ])}>
        <LogoIcon className="Logo__icon" width={120} height={28} />
        {text && <span className="Logo__text">{text}</span>}
        {url && <LinkComponent {...linkProps} className="Logo__link" />}
        {subline && <span className="Logo__subline">
            {reactHtmlParser(subline)}
          </span>}
      </div>;
  }
}
