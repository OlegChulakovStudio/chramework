import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './SocialNetworks.styl';


const SocialNetworks = ({ data, mod }) => {
	const blockStyl = classNames("SocialNetworks", {
		[`SocialNetworks_${mod}`]: mod,
	})
	return (
		<div className={blockStyl}>
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

SocialNetworks.propTypes = {
	data: PropTypes.object
}

export default SocialNetworks;
