import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';

import Button from '../Button/Button';
import InputShort from './InputShort/InputShort';

import './styles.styl';

import { required, email, phone, maxLength } from '../../utils/validation';

class InstallmentForm extends Component {
	constructor(props) {
		super(props);

		this.phoneValidate = maxLength(32);
		this.nameValidate = maxLength(50);
	}

	componentWillMount() {
		this.props.initialize();
	}

	submitForm = (
		data,
		title = 'Спасибо за&nbsp;заявку!',
		text = 'Наш специалист свяжется с&nbsp;вами в&nbsp;ближайшее время.'
	) => {
		const {
			isFetching,
			fetch,
			modal: { component, options }
		} = this.props;

		if (!isFetching) {
			fetch &&
				fetch(
					data,
					{
						modalType: component,
						modalProps: options
					},
					'installmentForm'
				);
		}
	};

	onSubmit = data =>
		this.submitForm({ ...data, eventType: this.props.eventType });

	render() {
		const { theme } = this.props;

		return (
			<div
				className={cn('InstallmentForm', {
					[`InstallmentForm_${theme}`]: theme
				})}
			>
				<form onSubmit={this.props.handleSubmit}>
					<div className="InstallmentForm__item">
						<div className="InstallmentForm__row">
							<div className="InstallmentForm__row-wrapper">
								<Field
									type="text"
									name="name"
									component={InputShort}
									label="Имя"
									validate={[required, this.nameValidate]}
									white={this.props.theme === 'white'}
								/>
								<Field
									type="tel"
									name="phone"
									component={InputShort}
									label="Телефон"
									numberFormat
									validate={[required, phone, this.phoneValidate]}
									white={this.props.theme === 'white'}
								/>
								<Field
									type="email"
									name="email"
									component={InputShort}
									label="Email"
									validate={[required, email]}
									white={this.props.theme === 'white'}
								/>
							</div>
						</div>
					</div>
					<div
						className={cn(
							'InstallmentForm__line',
							'InstallmentForm__line_right'
						)}
					>
						<Button
							type="submit"
							className="InstallmentForm__button"
							text={this.props.buttonText}
							whitePale={this.props.theme === 'white'}
						/>
						<div className="InstallmentForm__license">
							Нажимая на&nbsp;кнопку, вы&nbsp;даете{' '}
							<a
								href="https://chulakov.ru/agreement"
								target="_blank"
								rel="noopener noreferrer"
							>
								согласие
							</a>{' '}
							на&nbsp;обработку персональных данных и&nbsp;соглашаетесь
							с&nbsp;политикой конфиденциальности.
						</div>
					</div>
				</form>
			</div>
		);
	}
}

InstallmentForm.propTypes = {
	handleSubmit: PropTypes.any,
	initialize: PropTypes.func,
	buttonText: PropTypes.string
};

InstallmentForm = reduxForm({
	form: 'installmentForm',
	destroyOnUnmount: false
})(InstallmentForm);

export default InstallmentForm;
