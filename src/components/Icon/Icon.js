import React from 'react';
import PropTypes from 'prop-types';

//svg sprite element
const Icon = ({ className, glyph, width, height, ...rest }) => {
	const viewBox = glyph.viewBox.split(' ');
	const sizes = {
		width: width > 0 ? width : Number(viewBox[2]),
		height: height > 0 ? height : Number(viewBox[3]),
	};
	return (
		<svg className={`Icon ${className}`} viewBox={glyph.viewBox} {...sizes} {...rest}>
			<use xlinkHref={`#${glyph.id}`} />
		</svg>
	);
};

Icon.defaultProps = {
	className: '',
	width: 0,
	height: 0,
};

Icon.propTypes = {
	className: PropTypes.string,
	glyph: PropTypes.object.isRequired,
	width: PropTypes.any,
	height: PropTypes.any,
};

export default Icon;
