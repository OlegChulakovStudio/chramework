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
    defaultValue: PropTypes.string
  };

  static defaultProps = {
    className: '',
    disabled: false,
    hasErrors: false,
    label: '',
    maxRowsCount: 5,
    multiRows: false,
    type: 'text',
    defaultValue: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      hasValue: false
    };
  }

  componentWillMount() {
    const { value } = this.props;
    if (value) {
      this.setState({
        value,
        hasValue: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
        hasValue: !!nextProps.value
      });
    }
  }

  onFocus = e => {
    this.container.classList.add('Input--focus');
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  onBlur = e => {
    this.container.classList.remove('Input--focus');
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
      hasValue: !!e.target.value
    });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };
  render() {
    const {
      className,
      label,
      type,
      hasErrors,
      disabled,
      multiRows,
      maxRowsCount,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      meta,
      ...otherProps
    } = this.props;
    return (
      <div
        className={classNames([
          'Input',
          {
            'Input--error': hasErrors,
            'Input--value': this.state.hasValue,
            'Input--disabled': disabled
          },
          className
        ])}
        ref={elem => (this.container = elem)}
      >
        {multiRows ? (
          <TextArea
            {...otherProps}
            className="Input__field"
            rows="1"
            maxRows={maxRowsCount}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            disabled={disabled}
            value={this.state.value}
          />
        ) : (
          <input
            {...otherProps}
            type={type}
            className="Input__field"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            disabled={disabled}
            value={this.state.value}
          />
        )}
        {this.props.label && (
          <label className="Input__label">{this.props.label}</label>
        )}
      </div>
    );
  }
}
