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
		defaultValue: PropTypes.string,
		/** if use redux form */
		input: PropTypes.object
	};

	static defaultProps = {
		className: '',
		disabled: false,
		hasErrors: false,
		input: undefined,
		label: '',
		maxRowsCount: 5,
		multiRows: false,
		type: 'text',
		defaultValue: ''
	};

	constructor(props) {
		super(props);
		const { input } = this.props;
		this.state = {
			value: input ? input.value : '',
			focused: false,
			error: false
		};
	}
	state={
		focused: false,
		value: '',
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
		const { input, onFocus } = this.props;
		if (input) {
			input.onFocus();
		}
		if (onFocus && !input) {
			onFocus(e);
		}
		this.setState({
			focused: true
		})
	};

	onBlur = e => {
		const { input, onBlur } = this.props;
		if (input) {
			input.onBlur();
		}
		if (onBlur && !input) {
			onBlur(e);
		}
		this.setState({
			focused: false
		})
	};

	onChange = e => {
		const { input, onChange } = this.props;
		const doChange = (value, onChange) => {
			onChange && onChange(value);
			this.setState({ value: value });
		};

		if (input) {
			doChange(e.target.value, input.onChange);
		} else {
			doChange(e.target.value, onChange);
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
			input,
			meta,
			...otherProps
		} = this.props;

		return (
			<div
				className={classNames([
					'Input',
					{
						'Input--error': hasErrors || (meta && meta.touched && meta.error),
						'Input--focus': (meta && meta.active) || this.state.focused,
						'Input--value': (input && input.value) || this.state.value.length > 0,
						'Input--valid': meta && meta.touched && meta.valid,
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
						value={input ? input.value : this.state.value}
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
						value={input ? input.value : this.state.value}
					/>
				)}
				{this.props.label && (
					<label className="Input__label">{this.props.label}</label>
				)}
			</div>
		);
	}
}
