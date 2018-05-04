import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Paragraph from '../Paragraph/Paragraph';
import Link from '../Link/Link';

import './Summary.styl';

const production = {
	external: { href: 'https://chulakov.ru/life/top8' },
	internal: { to: { pathname: '/life/top8', state: { fromHome: true } } }
}
const design = {
	external: { href: 'https://chulakov.ru/life/top2' },
	internal: { to: { pathname: '/life/top2', state: { fromHome: true } } }
}
const usability = {
	external: { href: 'https://chulakov.ru/life/best-usability' },
	internal: { to: { pathname: '/life/best-usability', state: { fromHome: true } } }
}
const keyperson = {
	external: { href: 'https://chulakov.ru/life/top10' },
	internal: { to: { pathname: '/life/top10', state: { fromHome: true } } }
}

const Summary = ({ awards, className, external, ...rest }) => {
	const blockStyle = classNames(['Summary', className, {
		'Summary_awards': awards
	}]);

	const productionLink = external ? production.external : production.internal;
	const designLink = external ? design.external : design.internal;
	const usabilityLink = external ? usability.external : usability.internal;
	const keypersonLink = external ? keyperson.external : keyperson.internal;

	return (
		<div {...rest} className={blockStyle}>
			<div className="Summary__item Summary__item_medal Summary__item_medal1">
				<div className="Summary__content">
					<Paragraph mod="boldMedium" className="Summary__title">Лучший <nobr>usability&nbsp;/ UX</nobr><br />и&nbsp;топ-2 дизайн-студий</Paragraph>
					<Paragraph mod="bodySmall" className="Summary__text">
						по&nbsp;версии <nobr>«<Link {...usabilityLink} className="Summary__text-link">Золотого сайта</Link>»</nobr> <nobr>и&nbsp;<Link {...designLink} className="Summary__text-link">Tagline</Link></nobr>
					</Paragraph>
				</div>
			</div>
			<div className="Summary__item Summary__item_medal Summary__item_medal8">
				<div className="Summary__content">
					<Paragraph mod="boldMedium" className="Summary__title">Топ-8<br /><nobr>digital production</nobr></Paragraph>
					<Paragraph mod="bodySmall" className="Summary__text">
						по&nbsp;версии{' '}
						<nobr><Link {...productionLink} className="Summary__text-link">
							Tagline
						</Link></nobr>
					</Paragraph>
				</div>
			</div>
			<div className="Summary__item Summary__item_medal Summary__item_medal9">
				<div className="Summary__content">
					<Paragraph mod="boldMedium" className="Summary__title">Топ-10<br />ключевых фигур</Paragraph>
					<Paragraph mod="bodySmall" className="Summary__text">
						интернет-рынка России по&nbsp;версии{' '}
						<nobr><Link {...keypersonLink} className="Summary__text-link">
							Tagline
						</Link></nobr>
					</Paragraph>
				</div>
			</div>
			{!awards && <div className="Summary__item Summary__item_counter Summary__item_experience" key="counter2">
				<div className="Summary__number">9</div>
				<Paragraph className="Summary__title" mod="boldMedium">лет опыта</Paragraph>
			</div>}
			{!awards && <div className="Summary__item Summary__item_counter Summary__item_specialists" key="counter1">
				<div className="Summary__number">70</div>
				<Paragraph mod="boldMedium" className="Summary__title">специалистов</Paragraph>
			</div>}
		</div>
	);
};
Summary.defaultProps = {
	awards: undefined,
	external: undefined
};
Summary.propTypes = {
	awards: PropTypes.bool,
	external: PropTypes.bool
};

export default Summary;
