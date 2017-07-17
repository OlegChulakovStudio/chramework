import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TableCell.styl';

export default class TableCell extends Component {
  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    /** Set this parameter to 'true' to enable head cell styles  */
    headCell: PropTypes.bool,
    /** content align. Avaliable values ['center', 'left', 'right'] */
    align: PropTypes.string
  }
  render() {
    const { className, headCell, align } = this.props;
    return (
      <td className={classNames([
        "TableCell",
        { 
          "TableCell--head": headCell,
          [`TableCell--${align}`]: align
        },
        className
      ])}
      >
        {this.props.children}
      </td>
    );
  }
}