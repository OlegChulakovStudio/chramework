import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import TargetBlank from '../../assets/target-blank.svg';
import './Link.styl';

const Link = ({
	to,
	children,
	bold,
	className,
	light,
	href,
	disableBlank,
	noLink,
	noBlank,
	onClick,
	...rest
}) => {
	const handleClick = (e) => {
		onClick && onClick(e);
		window.isLocationChagned = true;
	}
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
		linkProps = { href, target: noBlank ? '' : '_blank' };
	}
	if (noLink) {
		RenderedComponent = 'span';
	}

	return (
		<RenderedComponent {...rest} className={linkStyle} onClick={handleClick} {...linkProps}>
			{children}
			{((href && !disableBlank) || noLink) && <TargetBlank className="Link__target-blank" />}
		</RenderedComponent>
	);
};
Link.defaultProps = {
	to: undefined,
	href: undefined,
	className: undefined,
	children: null,
	bold: undefined,
	light: undefined,
	noLink: false,
	noBlank: false,
	disableBlank: false
};

Link.propTypes = {
	to: PropTypes.any,
	href: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
	bold: PropTypes.any,
	light: PropTypes.bool,
	noLink: PropTypes.bool,
	noBlank: PropTypes.bool,
	disableBlank: PropTypes.bool
};

export default Link;
