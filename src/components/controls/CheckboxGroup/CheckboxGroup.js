import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox/Checkbox.js';
import classNames from 'classnames';

import './CheckboxGroup.styl';

class CheckboxGroup extends Component {
	static propTypes = {
		className: PropTypes.string,
		input: PropTypes.object,
		options: PropTypes.array,
		name: PropTypes.string,
	};
	static defaultProps = {
		className: '',
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
		const { input, className, options, name, meta, ...rest } = this.props;
		const blockClassName = classNames(['CheckboxGroup', className]);

		return (!!options && <div {...rest} className={blockClassName}>
				{options.map((option, i) => {
					const {value, label, ...itemRest} = option;
					const props = {};
					if (input) {
						props.checked = input.value && input.value.indexOf(value) !== -1;
					} else {
						props.checked = this.state.value && this.state.value.indexOf(value) !== -1;
					}
					const keyId = `checkbox-${i}`;
					const inputName = input ? input.name : name;

					return (
						<Checkbox
							{...itemRest}
							{...props}
							key={keyId}
							className="CheckboxGroup__label"
							name={inputName+'[]'}
							value={value}
							onChange={() => this.handleChange(value)}
							label={label}
						/>
					);
				})}
			</div>
		);
	}
}

export default CheckboxGroup;
