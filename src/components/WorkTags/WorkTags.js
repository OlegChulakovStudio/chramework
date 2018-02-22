import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Paragraph from '../Paragraph/Paragraph';
import './WorkTags.styl';

const WorkTags = ({ list, className, ...rest }) => (
	<Paragraph TagName="div" {...rest} mod="bodySmallGray" className={classNames(['WorkTags', className])}>
		{list.map(tag => <span key={tag} className="WorkTags__item">{tag}</span>)}
	</Paragraph>
);

WorkTags.defaultProps = {
	className: '',
};

WorkTags.propTypes = {
	list: PropTypes.array.isRequired,
	className: PropTypes.string,
};

export default WorkTags;
