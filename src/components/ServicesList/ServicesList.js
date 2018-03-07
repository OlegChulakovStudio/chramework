import React from 'react';
import ServicesItem from '../ServicesItem/ServicesItem';
import classNames from 'classnames';

import TestIcon from '../../assets/services/development.svg';
import testAnimate from '../../assets/services/animate/analytics.json';
import './ServicesList.styl';

const example = [{
	icon: TestIcon,
	label: "Аналитика",
	linkProps: {
		href: 'https://chulakov.ru/analytics'
	}
}, {
	animation: { animData: testAnimate },
	icon: TestIcon,
	label: "Дизайн",
	linkProps: {
		href: 'https://chulakov.ru/services#design'
	}
}];

const ServicesList = (props) => {
	const { className, data, ...rest } = props;
	const ServicesStyle = classNames(['ServicesList', className]);
	return (
		<div {...rest} className={ServicesStyle}>
			{(data || example).map((item, i) => <ServicesItem key={`serviceItem${i}`} {...item} />)}
		</div>
	);
};

export default ServicesList;
