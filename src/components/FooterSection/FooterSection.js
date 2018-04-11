import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reactHtmlParser from 'react-html-parser';

import SocialNetworks from '../SocialNetworks/SocialNetworks.js';
import Button from '../Button/Button';
import Copyright from '../Copyright/Copyright.js';
import moscow from '../../assets/contacts/moscow.svg';
import rostov from '../../assets/contacts/rostov.svg';

import './FooterSection.styl';

const data = [{
	mod: 'moscow',
	title: 'Московский офис',
	icon: moscow,
	address: 'Берсеневский пер., д.&nbsp;5, cтр.&nbsp;4, третий этаж, Москва, 119072',
	phone: '+7 495 268-06-61',
	tel: '+74952680661'
}, {
	mod: 'rostov',
	title: 'Ростовский офис',
	icon: rostov,
	address: 'ул. Менжинского, 2Л, БЦ&nbsp;&laquo;Форум&raquo;, оф.&nbsp;208, <nobr>Ростов-на-Дону</nobr>, 344029',
	phone: '+7 863 303-61-91',
	tel: '+78633036191'
}];

const socials = {
	facebook: 'https://www.facebook.com/OlegChulakovStudio/',
	vkontakte: 'https://vk.com/olegchulakovstudio',
	instagram: 'https://www.instagram.com/chulakov_ru/'
}
const FooterSection = ({ text, light, offsetLeft, offsetRight, email, className, showButton, ...rest }) => {
	const blockStyle = classNames('FooterSection', className, {
		'FooterSection--light': light,
		'FooterSection--offsetLeft': offsetLeft,
		'FooterSection--offsetRight': offsetRight,
	});
	return (
		<div {...rest} className={blockStyle}>
			<div className="FooterSection__container">
				<div className="FooterSection__top">
					<div className="FooterSection__top-title">{reactHtmlParser(text)}</div>
					<a href={`mailto:${email}`} className="FooterSection__top-link">
						{email}
					</a>
				</div>
				<div className="FooterSection__content">
					<div className="FooterSection__info">
						{data.map((item, i) => {
							const key = `footerItem${i}`;
							const Icon = item.icon;
							const iconStyle = classNames('FooterSection__icon', {
								[`FooterSection__icon--${item.mod}`]: item.mod,
							});

							return (
								<div key={key} className="FooterSection__content-item">
									<div className="FooterSection__content-head">
										<div className={iconStyle}>
											<Icon />
										</div>
										<div className="FooterSection__content-title">
											{reactHtmlParser(item.title)}
										</div>
									</div>
									<div className="FooterSection__content-address">
										{reactHtmlParser(item.address)}
									</div>
									<a
										href={`tel:${item.tel}`}
										className="FooterSection__content-phone">
										{reactHtmlParser(item.phone)}
									</a>
								</div>
							);
						})}
					</div>
					{showButton && <div className="FooterSection__feedback">
						<Button
							text="Заполнить бриф"
							{...showButton}
							className="FooterSection__feedback-button"
						/>
					</div>}
				</div>
				<div className="FooterSection__bottom">
					<div className="FooterSection__copyright">
						<Copyright />
					</div>
					<SocialNetworks data={socials} mod="white" />
				</div>
			</div>
		</div>
	);
};

FooterSection.defaultProps = {
	text: 'Оставьте заявку',
	email: 'hello@chulakov.ru',
};

FooterSection.propTypes = {
	text: PropTypes.string,
	light: PropTypes.bool,
	offsetLeft: PropTypes.bool,
	offsetRight: PropTypes.bool,
	showButton: PropTypes.object,
	email: PropTypes.string,
};

export default FooterSection;
