import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Paragraph from '../Paragraph/Paragraph';
import Link from '../Link/Link';

import './Summary.styl';

const production = {
	external: { href: 'https://chulakov.ru/life/top5' },
	internal: { to: { pathname: '/life/top5', state: { fromHome: true } } }
}
const design = {
	external: { href: 'https://chulakov.ru/life/best-design-studio' },
	internal: { to: { pathname: '/life/best-design-studio', state: { fromHome: true } } }
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
			<div className="Summary__inner">
			<Link {...usabilityLink} disableBlank className="Summary__item Summary__item_medal Summary__item_medal1 Summary__item_goldenSite">
				<div className="Summary__content">
					<Paragraph mod="boldMedium" className="Summary__title">Лучший <nobr>usability / UX</nobr></Paragraph>
				</div>
			</Link>
			<Link {...designLink} disableBlank className="Summary__item Summary__item_medal Summary__item_medal1 Summary__item_tagline">
				<div className="Summary__content">
					<Paragraph mod="boldMedium" className="Summary__title">Лучшая <nobr>дизайн-студия</nobr></Paragraph>
				</div>
			</Link>
			<Link {...productionLink} disableBlank className="Summary__item Summary__item_medal Summary__item_medal5 Summary__item_tagline">
				<div className="Summary__content">
					<Paragraph mod="boldMedium" className="Summary__title">Топ-5 <nobr>digital production</nobr></Paragraph>
				</div>
			</Link>
			<Link {...keypersonLink} disableBlank className="Summary__item Summary__item_medal Summary__item_medal9 Summary__item_tagline">
				<div className="Summary__content">
					<Paragraph mod="boldMedium" className="Summary__title">Арт-директор в&nbsp;топ-10 ключевых персон Рунета</Paragraph>
				</div>
			</Link>
			{!awards && <div className="Summary__item Summary__item_counter Summary__item_experience" key="counter2">
				<div className="Summary__number">9</div>
				<Paragraph className="Summary__title" mod="boldMedium">лет опыта</Paragraph>
			</div>}
			{!awards && <div className="Summary__item Summary__item_counter Summary__item_specialists" key="counter1">
				<div className="Summary__number">70</div>
				<Paragraph mod="boldMedium" className="Summary__title">специалистов</Paragraph>
			</div>}
			</div>
			<div className="Summary__notes">
				<Paragraph><span>*</span> по&nbsp;версии &laquo;Золотого сайта&raquo;</Paragraph>
				<Paragraph><span style={{marginLeft: '-5px'}}>**</span> по&nbsp;версии Tagline</Paragraph>
			</div>
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
