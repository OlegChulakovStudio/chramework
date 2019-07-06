import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './WorkTags.styl';

const WorkTags = ({ list, allTags, className, ...rest }) => {
	return (
		<div {...rest} className={classNames(['WorkTags', className])}>
			{list.map(tag => {
				const itemClass = classNames("WorkTags__item", {
					"WorkTags__item_noLowerCase": allTags[tag].noLowerCase
				})
				return (
					<span key={tag} className={itemClass}>{allTags[tag].ru}</span>
				)
			})}
		</div>
	)
};

WorkTags.defaultProps = {
	className: '',
};

WorkTags.propTypes = {
	list: PropTypes.array.isRequired,
	className: PropTypes.string,
};

export default WorkTags;
