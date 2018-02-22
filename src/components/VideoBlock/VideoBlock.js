import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Player from '../Player/Player';
import TextGroup from '../TextGroup/TextGroup';
import DemoIcon from '../../assets/clients/tele2.svg';

import './VideoBlock.styl';

const VideoBlock = ({ Icon, lg, video, title, subtitle, url, children, ...react }) => {
	const playerStyle = classNames(['VideoBlock', { VideoBlock_lg: lg }]);

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

				{/* <div className="VideoBlock__info">
					{linkToWork ? (
						<Link to={`/work/${work.url}`} className="VideoBlock__title VideoBlock__title_link">
							<Paragraph mod="boldMedium">{currentTitle}</Paragraph>
						</Link>
					) : (
						<div className="VideoBlock__title">
							<Paragraph mod="boldMedium">{currentTitle}</Paragraph>
						</div>
					)}
					{currentSubtitle && (
						<div className="VideoBlock__subtitle">
							<Paragraph mod="italicText">{currentSubtitle}</Paragraph>
						</div>
					)}
				</div> */}

				<Icon className="Icon VideoBlock__logo" />

			</div>
			{children}
		</div>
	);
};

VideoBlock.defaultProps = {
	Icon: DemoIcon,
	lg: undefined,
	video: undefined,
	title: undefined,
	subtitle: undefined,
	url: undefined,
};

VideoBlock.propTypes = {
	Icon: PropTypes.func,
	lg: PropTypes.bool,
	video: PropTypes.object,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	url: PropTypes.object,
};

export default VideoBlock;
