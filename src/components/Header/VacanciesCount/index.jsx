import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.styl';

const VacanciesCount = ({ isMobile, count }) => {
	const blockStyle = classNames('VacanciesCount__inner', {
		VacanciesCount__inner_isMobile: isMobile,
	});
	return (
		<div className="VacanciesCount">
			{count > 0 && (
				<div className={blockStyle} title="Открытые вакансии">
					{count > 0 && count}
				</div>
			)}
		</div>
	);
};

VacanciesCount.propTypes = {
	isMobile: PropTypes.bool,
};

export default VacanciesCount;
