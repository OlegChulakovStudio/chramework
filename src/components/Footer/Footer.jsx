import React from 'react';
import PropTypes from 'prop-types';
import reactHtmlParser from 'react-html-parser';
import classNames from 'classnames';

import Link from '../Link/Link';
import Note from '../Note/Note';

import './styles.styl';

import Facebook from './assets/facebook.svg';
import Vk from './assets/vk.svg';
import Instagram from './assets/instagram.svg';

const icons = {
	facebook: Facebook,
	vk: Vk,
	instagram: Instagram
};

const Footer = ({ data, dark, isHome }) => {
	const blockStyle = classNames('Footer', {
		Footer_dark: dark,
		Footer_isHome: isHome
	});

	return (
		<footer className={blockStyle}>
			<div className={'Footer__inner'}>
				<div className={'Footer__note'}>
					<Note className={'Footer__company'} text={data.company} />
					<div className={'Footer__city'}>{reactHtmlParser(data.city)}</div>
				</div>

				<div className={'Footer__contacts'}>
					{data.phone && (
						<Link
							className={'Footer__phone'}
							disableBlank
							href={`tel:${data.phone.number}`}
						>
							{data.phone.content}
						</Link>
					)}

					{data.email && (
						<Link
							className={'Footer__email'}
							disableBlank
							href={`mailto:${data.email}`}
						>
							{data.email}
						</Link>
					)}

					{data.rights && (
						<Link
							className={'Footer__rights'}
							disableBlank
							href={data.rights.url}
						>
							{data.rights.content}
						</Link>
					)}
				</div>

				<div className={'Footer__social'}>
					{data.social.map((item, i) => {
						const key = `link-${i}`;
						const Icon = icons[item.icon];
						return (
							<Link
								key={key}
								className={classNames(
									'Footer__social-item',
									`Footer__social-item_${item.icon}`
								)}
								disableBlank
								href={item.url}
							>
								<Icon />
							</Link>
						);
					})}
				</div>
			</div>
		</footer>
	);
};

Footer.propTypes = {
	data: PropTypes.object.isRequired,
	dark: PropTypes.bool,
	isHome: PropTypes.bool
};

export default Footer;
