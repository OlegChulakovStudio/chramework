import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputElement from 'react-input-mask';
import Textarea from 'react-textarea-autosize';

import './styles.styl';

class InputShort extends Component {
	state = {
		focused: false
	};

	handleFocus = event => {
		this.setState({
			focused: true
		});
	};

	handleBlur = event => {
		this.setState({
			focused: false
		});
	};

	render() {
		const {
			input,
			type,
			meta,
			className,
			textArea,
			numberFormat,
			label,
			fullWidth,
			email,
			icon,
			custom,
			white,
			...rest
		} = this.props;
		const styleWrapper = classNames({
			InputShort: true,
			InputShort_focused: (meta && meta.active) || this.state.focused,
			InputShort_value: input && input.value,
			InputShort_error: meta && meta.touched && meta.error,
			InputShort_valid: meta && meta.touched && meta.valid,
			InputShort_fullWidth: fullWidth,
			InputShort_textarea: textArea,
			InputShort_hidden: type === 'hidden',
			InputShort_custom: custom,
			InputShort_white: white,
			[`${className}`]: className
		});

		const styleInput = classNames({
			InputShort__field: true
		});

		const Icon = icon;
		const { name, ...otherCustomProsp } = input;
		const otherProps = custom ? { ...otherCustomProsp } : { ...input };
		const inputProps = custom
			? { onFocus: this.handleFocus, onBlur: this.handleBlur }
			: {};

		return (
			<div className={styleWrapper}>
				{textArea || numberFormat || email ? (
					(textArea && <Textarea {...input} {...rest} />) ||
					(numberFormat && (
						<InputElement
							{...inputProps}
							type={type || 'text'}
							className={styleInput}
							autoComplete="off"
							{...otherProps}
							{...rest}
						/>
					)) ||
					(email && (
						<InputElement
							{...inputProps}
							type={type || 'text'}
							className={styleInput}
							autoComplete="off"
							{...otherProps}
							{...rest}
						/>
					))
				) : (
					<InputElement
						{...inputProps}
						type={type || 'text'}
						className={styleInput}
						autoComplete="off"
						{...otherProps}
						{...rest}
					/>
				)}

				{label && (
					<label htmlFor={name} className="InputShort__label">
						{label}
					</label>
				)}
				{icon && <Icon className="InputShort__icon" />}
			</div>
		);
	}
}

InputShort.propTypes = {
	input: PropTypes.any,
	type: PropTypes.any,
	meta: PropTypes.any,
	label: PropTypes.any,
	numberFormat: PropTypes.bool,
	className: PropTypes.any,
	fullWidth: PropTypes.bool,
	textArea: PropTypes.bool,
	email: PropTypes.bool,
	custom: PropTypes.bool,
	icon: PropTypes.any,
	white: PropTypes.bool
};

export default InputShort;
