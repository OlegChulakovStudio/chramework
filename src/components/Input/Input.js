import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TextArea from 'react-textarea-autosize';
import './Input.styl';

export default class Input extends Component {

  static propTypes = {
    /** space delimited list of additional class names */
    className: PropTypes.string,
    disabled: PropTypes.bool,
    hasErrors: PropTypes.bool,
    /** text over the input */
    label: PropTypes.string,
    /** maximum rows count for textarea. It will take affect only with multiRows parameter */
    maxRowsCount: PropTypes.number,
    /** render 'textarea' instead of 'input' field */
    multiRows: PropTypes.bool,
    /** callback function that is fired when the textfield's value changes. */
    onChange: PropTypes.func,
    /** type of current input */
    type: PropTypes.string,
    /** value of text field */
    value: PropTypes.string
  };

  static defaultProps = {
    className: '',
    disabled: false,
    hasErrors: false,
    label: '',
    maxRowsCount: 5,
    multiRows: false,
    type: 'text',
    value: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      hasValue: false
    };
  }

  onFocus = () => {
    this.container.classList.add('Input--focus');
  }

  onBlur = (e) => {
    this.container.classList.remove('Input--focus');
    if(this.state.hasValue !== !!e.target.value.length) {
      this.setState({
        hasValue: !!e.target.value.length,
      });
    }
  }

  render() {
    const { className, label, type, hasErrors, disabled, multiRows, maxRowsCount, value, ...otherProps } = this.props;
    return (
      <div className={classNames([
        "Input",
        { 
          "Input--error": hasErrors,
          "Input--value": this.state.hasValue,
          "Input--disabled": disabled
        },
        className
      ])} ref={ elem => this.container = elem }>
        {
          multiRows ?
            <TextArea
              className="Input__field"
              rows="1"
              maxRows={maxRowsCount}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              disabled={disabled}
              {...otherProps}
            ></TextArea>
          :
            <input
              type={type}
              className="Input__field"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              disabled={disabled}
              {...otherProps}
            />
        }
        {
          this.props.label &&
          <label className="Input__label">{ this.props.label }</label>
        }
      </div>
    );
  }
}