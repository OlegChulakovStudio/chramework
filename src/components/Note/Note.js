import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Note.styl';

export default class Note extends PureComponent {

  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    text: PropTypes.string,
    /** move note to the right */
    right: PropTypes.bool
  };

  render() {
    return (
      <div className={classNames([
        "note",
        { "note--right": this.props.right },
        this.props.className
      ])}>
        {this.props.text}
      </div>
    )
  }
}