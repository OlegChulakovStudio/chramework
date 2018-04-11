import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import TargetBlank from '../../assets/target-blank.svg';
import './Link.styl';

const LinkElement = ({
	to,
	children,
	bold,
	className,
	light,
	href,
	disableBlank,
	noLink,
	...rest
}) => {
	const linkStyle = classNames(['Link', className, {
		Link_bold: bold,
		Link_light: light,
		Link_external: href && !disableBlank,
	}]);
	let RenderedComponent = to ? NavLink : href ? 'a' : 'span';
	let linkProps = {};
	if (to) {
		linkProps = { to };
	} else if (href) {
		linkProps = { href, target: '_blank' };
	}
	if(noLink) {
		RenderedComponent = 'span';
	}
	return (
		<RenderedComponent {...rest} className={linkStyle} {...linkProps}>
			{children}
			{((href && !disableBlank) || noLink) && <TargetBlank className="Link__target-blank" />}
		</RenderedComponent>
	);
};
LinkElement.defaultProps = {
	to: undefined,
	href: undefined,
	className: undefined,
	children: null,
	bold: undefined,
	light: undefined,
	noLink: false,
	disableBlank: false
};

LinkElement.propTypes = {
	to: PropTypes.any,
	href: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
	bold: PropTypes.any,
	light: PropTypes.bool,
	noLink: PropTypes.bool,
	disableBlank: PropTypes.bool
};

export default LinkElement;
