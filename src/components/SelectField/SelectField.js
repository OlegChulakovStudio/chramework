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
      hasValue: false,
      value: this.props.value || null
    };
  }

  onFocus = () => {
    this.container.classList.add('SelectField--focus');
  }

  onBlur = (e) => {
    if(!this.state.hasValue) {
      this.container.classList.remove('SelectField--focus');
    }
  }

  onChange = (value) => {
    if(this.props.onChange) {
      this.props.onChange();
    }
    this.setState({
      value,
      hasValue: true
    });
  }

  render() {
    const { className, disabled, hasErrors, label, ...otherProps } = this.props;
    return (
      <div className={classNames([
        "SelectField",
        {
          "SelectField--disabled": disabled,
          "SelectField--error": hasErrors,
          "SelectField--value": this.state.hasValue
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
          onChange={this.onChange}
          value={this.state.value}
          {...otherProps}
        />
        <label className="SelectField__label">{ label }</label>
      </div>
    );
  }
}
