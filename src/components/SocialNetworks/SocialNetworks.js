import React from 'react';
import facebook from '../../assets/socials/facebook.svg';
import vkontakte from '../../assets/socials/vkontakte.svg';
import instagram from '../../assets/socials/instagram.svg';
import './SocialNetworks.styl';

const data = [{
	icon: facebook,
	link: 'https://www.facebook.com/OlegChulakovStudio/'
}, {
	icon: vkontakte,
	link: 'https://vk.com/olegchulakovstudio'
}, {
	icon: instagram,
	link: 'https://www.instagram.com/chulakov_ru/'
}];
const SocialNetworks = () => {
	return (
		<div className="SocialNetworks">
			{data.map((item, i) => {
				const Icon = item.icon;
				const key = `social${i}`;
				return (
					<a
						key={key}
						href={item.link}
						target="_blank"
						className="SocialNetworks__link">
						<Icon />
					</a>
				);
			})}
		</div>
	);
};

export default SocialNetworks;
