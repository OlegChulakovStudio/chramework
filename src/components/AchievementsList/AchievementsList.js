import React from 'react';
import PropTypes from 'prop-types';
import reactHtmlParser from 'react-html-parser';
import classNames from 'classnames';
import Paragraph from '../Paragraph/Paragraph';

import EdaIcon from '../../assets/achievements/eda.svg'
import FwaIcon from '../../assets/achievements/fwa.svg'
import AwwwardsIcon from '../../assets/achievements/awwwards.svg'
import CssdaIcon from '../../assets/achievements/cssda.svg'

import './AchievementsList.styl';

const content = {
	eda: {
		label: "EUROPEAN<br />DESIGN AWARDS",
		count: 3,
		icon: EdaIcon
	},
	fwa: {
		label: "FWA",
		count: 3,
		icon: FwaIcon
	},
	awwwards: {
		label: "AWWWARDS",
		count: 8,
		icon: AwwwardsIcon
	},
	cssda: {
		label: "CSSDA",
		count: 7,
		icon: CssdaIcon
	}
};

const AchievementsList = ({ mod, className, ...rest }) => {
	const blockStyle = classNames(['AchievementsList', className]);
	return (
		<div {...rest} className={blockStyle}>
			<Paragraph mod={mod} className="AchievementsList__head">91 награда</Paragraph>
			<div className="AchievementsList__wrapper">
				{Object.keys(content).map(key => {
					const item = content[key];
					const logoStyle = classNames(['AchievementsList__logo', {
						[`AchievementsList__logo_${key}`]: key,
					}]);
					const Icon = item.icon;
					return (
						<div key={item.label} className="AchievementsList__item">
							{/* <div className={logoStyle} /> */}
							<Icon className={logoStyle} />
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
};
AchievementsList.defaultProps = {
	mod: 'subtitlePhone',
};

export default AchievementsList;
