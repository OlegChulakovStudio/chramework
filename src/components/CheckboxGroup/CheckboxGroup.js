import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox/Checkbox.js';
import classNames from 'classnames';

import './CheckboxGroup.styl';

class CheckboxGroup extends Component {
	static propTypes = {
		label: PropTypes.string,
		meta: PropTypes.object,
		className: PropTypes.string,
		type: PropTypes.string,
		input: PropTypes.object,
		options: PropTypes.array,
		name: PropTypes.string,
	};
	static defaultProps = {
		label: '',
		className: '',
		type: '',
		options: undefined,
		input: undefined,
		name: '',
	};
	state = { value: [] }
	handleChange = val => {
		const { input } = this.props;
		const doChange = (value, onChange) => {
			const array = value ? value.slice() : [];
			if (array.indexOf(val) === -1) {
				array.push(val);
				onChange && onChange(array);
				this.setState({ value: array });
			} else {
				array.splice(array.indexOf(val), 1);
				onChange && onChange(array);
				this.setState({ value: array });
			}
		}

		if (input) {
			doChange(input.value, input.onChange);
		} else {
			doChange(this.state.value, this.props.onChange);
		}
	};

	render() {
		const { input, label, className, options, meta, name, ...rest } = this.props;
		const blockClassName = classNames({
			'CheckboxGroup': true,
			[`${className}`]: className,
		});

		return (!!options && <div className={blockClassName}>
				{options.map((option, i) => {
					const props = {};
					if (input) {
						props.checked = input.value && input.value.indexOf(option.value) !== -1;
					} else {
						props.checked = this.state.value && this.state.value.indexOf(option.value) !== -1;
					}
					const keyId = `checkbox-${i}`;
					const inputName = input ? input.name : name;

					return (
						<Checkbox
							{...rest}
							{...props}
							key={keyId}
							className="CheckboxGroup__label"
							name={inputName+'[]'}
							value={option.value}
							onChange={() => this.handleChange(option.value)}
							label={option.label}
						/>
					);
				})}
			</div>
		);
	}
}

export default CheckboxGroup;
