import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Avatar.styl';

export default class Avatar extends Component {
  static propTypes = {
    /** symbol that will be displayed if 'photo' was not set */
    char: PropTypes.string,
    /** space delimited list of additional class names */
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    /** image url */
    photo: PropTypes.string,
  };

  static defaultProps = {
    char: '',
    photo: ''
  };

  render() {
    const { char, className, isLoading, photo } = this.props;
    return (
      <div className={classNames([
        "avatar",
        {
          "avatar--loading": isLoading
        },
        className
      ])}>
        {
          photo ?
            <img className="avatar__image" src={ photo } alt="" />
          :
            <div className="avatar__text">{ char }</div>
        }
      </div>
    )
  }
}