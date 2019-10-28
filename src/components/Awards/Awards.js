import React from 'react';
import PropTypes from 'prop-types';
import reactHtmlParser from 'react-html-parser';
import cn from 'classnames';

import AwwwardsIcon from './assets/awwwards.svg';
import CssdaIcon from './assets/cssda.svg';
import EdaIcon from './assets/eda.svg';
import FwaIcon from './assets/fwa.svg';
import OneIcon from './assets/1.svg';
import FourIcon from './assets/4.svg';
import FiveIcon from './assets/5.svg';
import TenIcon from './assets/10.svg';

import './styles.styl';

const defaultIcons = {
	'1': OneIcon,
	'4': FourIcon,
	'5': FiveIcon,
	'10': TenIcon,
	fwa: FwaIcon,
	eda: EdaIcon,
	cssda: CssdaIcon,
	awwwards: AwwwardsIcon
};

const Awards = ({ id, data, footnotes, icons }) => {
	const iconsList = { ...defaultIcons, ...icons };

	return (
		<section id={id} className={'Awards'}>
			<div className={'Awards__wrapper'}>
				<div className={'Awards__content'}>
					{data.map((award, i) => {
						const awardKey = `award-${i}`;
						const iconsStyle = cn('Awards__icon', {
							Awards__icon_number: award.number
						});
						const Icon = iconsList[award.type];

						return (
							<div key={awardKey} className={'Awards__item'}>
								<div className={'Awards__item-wrapper'}>
									<div className={'Awards__item-inner'}>
										<div className={iconsStyle}>
											<Icon />
										</div>
										<p className={'Awards__text'}>
											{reactHtmlParser(award.text)}
										</p>
									</div>
									{award.total && (
										<div className={'Awards__total'}>{award.total}</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{footnotes && (
				<div className={'Awards__ratings'}>
					{footnotes.map((item, i) => {
						const key = `item-${i}`;
						const itemStyle = cn('Awards__ratings-item', {
							'Awards__ratings-item_tagline': item.tagline,
							'Awards__ratings-item_keyperson': item.keyperson
						});

						return (
							<p key={key} className={itemStyle}>
								{reactHtmlParser(item.text)}
							</p>
						);
					})}
				</div>
			)}
		</section>
	);
};

Awards.propTypes = {
	id: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.Object).isRequired,
	footnotes: PropTypes.arrayOf(PropTypes.Object),
	icons: PropTypes.Object
};

export default Awards;
