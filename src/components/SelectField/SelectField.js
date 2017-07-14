import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './SelectField.styl';

export default class SelectField extends Component {
  static propTypes = {
     /** space delimited list of additional class names */
    className: PropTypes.string,
    disabled: PropTypes.bool,
    hasErrors: PropTypes.bool,
    /** text over the input */
    label: PropTypes.string,
    labelKey: PropTypes.string,
    /** callback function */
    onChange: PropTypes.func,
    /** value of text field */
    value: PropTypes.string,
    valueKey: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    disabled: false,
    hasErrors: false,
    label: '',
    labelKey: 'label',
    valueKey: 'value'
  };

  constructor(props) {
    super(props);
    this.state = {
      hasValue: false
    };
  }

  onFocus = () => {
    this.container.classList.add('select-field--focus');
  }

  onBlur = (e) => {
    this.container.classList.remove('select-field--focus');
    if(this.state.hasValue !== !!e.target.value.length) {
      this.setState({
        hasValue: !!e.target.value.length,
      });
    }
  }

  render() {
    const { className, disabled, hasErrors, label, ...otherProps } = this.props;
    return (
      <div className={classNames([
        "select-field",
        {
          "select-field--disabled": disabled,
          "select-field--error": hasErrors,
          "select-field--value": this.state.hasValue
        },
        className
      ])}
        ref={ elem => this.container = elem }
      >
        <Select
          placeholder=""
          disabled={disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...otherProps}
        />
        <label className="select-field__label">{ label }</label>
      </div>
    );
  }
}
