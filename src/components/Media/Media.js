import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Note } from '../../index.js';
import './Media.styl';

export default class Media extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    /** this parameter must be set to 'true' if you want to add video */
    embedded: PropTypes.bool,
    /** you can add some text under the media content */
    note: PropTypes.string,
    /** local path or url to media content */
    url: PropTypes.string
  };

  static defaultProps = {
    className: '',
    embedded: false
  };

  render() {
    const { embedded, url, className, note } = this.props;
    return (
      <figure className={classNames([
        "Media",
        { "Media--embedded": embedded },
        className
      ])}>
        <div className="Media__content">
          {
            embedded ? <iframe src={url} frameBorder="0" title="title"></iframe>
              : <img src={url} alt="" />
          }
        </div>
        {note && <Note text={note} right />}
      </figure>
    )
  }
}