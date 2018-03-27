import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './SocialNetworks.styl';
import telegram from '../../assets/socials/telegram.svg';
import facebook from '../../assets/socials/facebook.svg';
import vkontakte from '../../assets/socials/vkontakte.svg';
import instagram from '../../assets/socials/instagram.svg';

const socialIcons = {
	telegram,
	facebook,
	vkontakte,
	instagram
};

const SocialNetworks = ({ data, mod }) => {
	const blockStyl = classNames("SocialNetworks", {
		[`SocialNetworks_${mod}`]: mod,
	})
	return (
		<div className={blockStyl}>
			{
				Object.keys(data).map((key, i) => {
					console.log(socialIcons[key])
					const Icon = socialIcons[key];
					const id = `social${i}`;
					return (
						<a
							key={id}
							href={data[key]}
							target="_blank"
							className="SocialNetworks__link">
							<Icon />
						</a>
					);
				})
			}
		</div>
	);
};

SocialNetworks.propTypes = {
	data: PropTypes.array
}

export default SocialNetworks;
