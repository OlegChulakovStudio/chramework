import React from 'react';
import PropTypes from 'prop-types';
import reactHtmlParser from 'react-html-parser';
import classNames from 'classnames';
import { pluralize } from '../../utils/helpers';

import Paragraph from '../Paragraph/Paragraph';

import data from './data.json';

import './AchievementsList.styl';

const awardsList = {
	eda: {
		label: "EUROPEAN<br />DESIGN AWARDS"
	},
	fwa: {
		label: "FWA"
	},
	awwwards: {
		label: "AWWWARDS"
	},
	cssda: {
		label: "CSSDA"
	}
};

Object.keys(data.awards).forEach(key => {
	const dataAwardsItem = data.awards[key];
	Object.keys(awardsList).some(awardKey => {
		if (dataAwardsItem[awardKey]) {
			const awardsListItem = awardsList[awardKey];
			if (typeof awardsListItem.count === 'undefined') awardsListItem.count = 1;
			else awardsListItem.count += 1;
			return true;
		}
		return false;
	});
});

const defaultTitle = ['награда', 'награды', 'наград'];

const AchievementsList = ({ mod, className, primaryTitle, ...rest }) => {
	const blockStyle = classNames(['AchievementsList', className]);
	const currentTitle = primaryTitle || defaultTitle;
	return (
		<div {...rest} className={blockStyle}>
			<Paragraph mod={mod} className="AchievementsList__head">
				{`${data.awards.length} ${pluralize(data.awards.length, currentTitle)}`}
			</Paragraph>
			<div className="AchievementsList__wrapper">
				{Object.keys(awardsList).map(key => {
					const item = awardsList[key];
					const logoStyle = classNames(['AchievementsList__logo', {
						[`AchievementsList__logo_${key}`]: key,
					}]);
					return (
						<div key={item.label} className="AchievementsList__item">
							<div className={logoStyle} />
							<div className="AchievementsList__content">
								<div className="AchievementsList__label">
									{reactHtmlParser(item.label)}
								</div>
								<div className="AchievementsList__count">× {item.count}</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

AchievementsList.propTypes = {
	mod: PropTypes.string,
	primaryTitle: PropTypes.array,
};
AchievementsList.defaultProps = {
	mod: 'subtitlePhone',
	primaryTitle: undefined,
};

export default AchievementsList;
