import React from 'react';
import ServicesItem from '../ServicesItem/ServicesItem';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { extend } from 'lodash';
import TestIcon from '../../assets/services/development.svg';
import './ServicesList.styl';

import testAnimate from '../../assets/services/animate/analytics.json';

const data = [{
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
}, {
	icon: TestIcon,
	label: "Разработка и&nbsp;интеграция",
	linkProps: {
		href: 'https://chulakov.ru/services#development'
	}
}, {
	icon: TestIcon,
	label: "Поддержка",
	linkProps: {
		href: 'https://chulakov.ru/services#support'
	}
}, {
	icon: TestIcon,
	label: "Креатив и&nbsp;стратегия",
	linkProps: {
		href: 'https://chulakov.ru/services#creative'
	}
}];

const ServicesList = (props) => (
	<div className="ServicesList">
		{(props.data || data).map((item, i) => (
			<ErrorBoundary key={`serviceItem${i}`} errorComponent={ServicesItem} errorProps={extend({}, item, {error: true})}>
				<ServicesItem {...item} />
			</ErrorBoundary>
		))
		}
	</div>
);

export default ServicesList;
