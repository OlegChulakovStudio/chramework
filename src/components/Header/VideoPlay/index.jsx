import React from 'react';
import PropTypes from 'prop-types';

import Link from '../../Link/Link';
import PlayIcon from '../../../assets/player/play_mini.svg';

import './styles.styl';

const VideoPlay = ({ data }) => {

	return (
		<Link {...data.link} disableBlank bold className="VideoPlay">
			<div className="VideoPlay__text">{data.text}</div>
			<div className="VideoPlay__image">
				<img src={data.image} alt="" />
				<div className="VideoPlay__icon">
					<PlayIcon />
				</div>

			</div>
		</Link>
	);
};

VideoPlay.propTypes = {
	data: PropTypes.object.isRequired,
};

export default VideoPlay;
