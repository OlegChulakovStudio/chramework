import React, { Component } from 'react';
import Link from '../Link/Link';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import reactHtmlParser from 'react-html-parser';
import ArrowIcon from './icons/arrow-link.svg';
import './Button.styl';

class Button extends Component {
	static propTypes = {
		/** if set to true, button will display in an active state */
		active: PropTypes.bool,
		/** space delimited list of additional class names */
		className: PropTypes.string,
		/** whether action is non-active */
		disabled: PropTypes.bool,
		/** visual intent color to apply to element. Avaliable values: ['secondary', 'success', 'danger'] */
		intent: PropTypes.string,
		/** sets the button size. Avaliable values are: ['small'] */
		size: PropTypes.string,
		/** action text */
		text: PropTypes.any,
		/** If this parameter set, button will turn into link with href equal to this prop.  */
		to: PropTypes.string,
		href: PropTypes.string,
		arrow: PropTypes.bool,
		/** HTML 'type' attribute of button. Common values are 'button' and 'submit'. Note that this prop has no effect if 'to' was set */
		type: PropTypes.string,
		/** click event handler */
		onClick: PropTypes.func,
		white: PropTypes.bool,
		pale: PropTypes.bool,
		dark: PropTypes.bool,
		uppercase: PropTypes.bool,
	};

	static defaultProps = {
		className: undefined,
		white: false,
		pale: false,
		dark: false,
		disabled: false,
		intent: undefined,
		size: undefined,
		text: undefined,
		to: undefined,
		href: undefined,
		arrow: false,
		type: 'button',
		onClick: undefined,
		uppercase: undefined,
	};
	state = {
		active: false,
	};
	onTouchStart = () => {
		this.setState({ active: true });
	};
	onTouchEnd = () => {
		this.setState({ active: false });
	};
	render() {
		const RenderedComponent =
			!this.props.to && !this.props.href ? 'button' : Link;

		const { intent, white, pale, dark, size, arrow, className, text, type, uppercase, ...rest } = this.props;

		return (
			<RenderedComponent
				{...rest}
				className={classNames([
					'Button',
					{
						'Button--active': this.state.active,
						'Button--arrow': arrow,
						[`Button--${intent}`]: intent,
						'Button--disabled': this.props.disabled,
						'Button--white': white,
						'Button--pale': pale,
						'Button--dark': dark,
						'Button--uppercase': uppercase,
						[`Button--${size}`]: size,
					},
					className,
				])}
				type={RenderedComponent === 'button' ? (type || 'button') : undefined}
				onTouchCancel={this.onTouchEnd}
				onTouchEnd={this.onTouchEnd}
				onTouchStart={this.onTouchStart}
			>
				<span className="Button__inner">
					<span className="Button__text">{reactHtmlParser(text)}</span>
					{arrow && <ArrowIcon className="Button__arrow" />}
				</span>
			</RenderedComponent>
		);
	}
}

export default Button;
