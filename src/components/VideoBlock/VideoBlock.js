import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Player from '../Player/Player';
import TextGroup from '../TextGroup/TextGroup';

import './VideoBlock.styl';

const VideoBlock = ({ Icon, lg, fullWidth, video, title, subtitle, url, children, className, isVideoPage, ...react }) => {
	const playerStyle = classNames(['VideoBlock', {
		VideoBlock_lg: lg,
		VideoBlock_fullWidth: fullWidth,
		VideoBlock_videoPage: isVideoPage
	}, className]);

	return (
		<div {...react} className={playerStyle}>
			<div className="VideoBlock__visual">
				<Player {...video} />
			</div>
			<div className="VideoBlock__head">
				<TextGroup
					mod="boldTitle"
					className="VideoBlock__info"
					title={title}
					subtitle={subtitle}
					url={url}
				/>
				{Icon && <Icon className="Icon VideoBlock__logo" />}
			</div>
			{children}
		</div>
	);
};

VideoBlock.defaultProps = {
	Icon: undefined,
	lg: undefined,
	fullWidth: undefined,
	video: undefined,
	title: undefined,
	subtitle: undefined,
	className: undefined,
	url: undefined,
	isVideoPage: undefined,
};

VideoBlock.propTypes = {
	Icon: PropTypes.func,
	lg: PropTypes.bool,
	fullWidth: PropTypes.bool,
	video: PropTypes.object,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	className: PropTypes.string,
	url: PropTypes.object,
	isVideoPage: PropTypes.bool,
};

export default VideoBlock;
