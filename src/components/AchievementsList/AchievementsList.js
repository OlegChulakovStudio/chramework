import React from 'react';
import PropTypes from 'prop-types';
import reactHtmlParser from 'react-html-parser';
import classNames from 'classnames';
import Paragraph from '../Paragraph/Paragraph';
import './AchievementsList.styl';

const content = [{
	label: "EUROPEAN<br />DESIGN AWARDS",
	count: 3,
	icon: "eda"
}, {
	label: "FWA",
	count: 3,
	icon: "fwa"
}, {
	label: "AWWWARDS",
	count: 8,
	icon: "awwwards"
}, {
	label: "CSSDA",
	count: 7,
	icon: "cssda"
}];

const AchievementsList = ({ mod, className, ...rest }) => {
	const blockStyle = classNames(['AchievementsList', className]);
	return (
		<div {...rest} className={blockStyle}>
			<Paragraph mod={mod} className="AchievementsList__head">91 награда</Paragraph>
			<div className="AchievementsList__wrapper">
				{content.map(item => {
					const logoStyle = classNames(['AchievementsList__logo', {
						[`AchievementsList__logo_${item.icon}`]: item.icon,
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
};
AchievementsList.defaultProps = {
	mod: 'subtitlePhone',
};

export default AchievementsList;
