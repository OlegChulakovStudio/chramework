import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './styles.styl';

const Hamburger = ({ menuIsOpened, onClick, mod }) => {
	const blockClass = classNames({
		Hamburger: true,
		"Hamburger_open": menuIsOpened,
		[`Hamburger_${mod}`]: mod,
	});
	return (
		<div className={blockClass} onClick={onClick}>
			<span className="Hamburger__line" />
			<span className="Hamburger__line" />
			<span className="Hamburger__line" />
		</div>
	);
};

Hamburger.propTypes = {
	mod: PropTypes.string,
	menuIsOpened: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Hamburger;
