import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Media.styl';

export default class Media extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    /** this parameter must be set to 'true' if you want to add video */
    embedded: PropTypes.bool,
    /** local path or url to media content */
    url: PropTypes.string
  };

  static defaultProps = {
    className: '',
    embedded: false
  };

  render() {
    const { embedded, url, className } = this.props;
    return (
      <figure className={classNames([
        "media",
        { "media--embedded": embedded },
        className
      ])}>
        <div className="media__content">
          {
            embedded ? <iframe src={url} frameBorder="0" title=" "></iframe>
            : <img src={url} alt="" />
          }
        </div>
      </figure>
    )
  }
}