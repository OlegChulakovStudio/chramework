import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Link from '../../Link/Link';
import PlayIcon from '../../../assets/player/play_mini.svg';

import './styles.styl';

class VideoPlay extends Component {
	state = {
		currentBg: ''
	}
	componentDidMount() {
		this.setRandomBg();

	}
	setRandomBg = () => {
		const { data } = this.props;
		const randomNumber = _.random(3);
		this.setState({
			currentBg: data.randomBg[randomNumber]
		});
	}
	onMouseEnter = () => {
		const { data } = this.props;
		this.setState({
			currentBg: data.gif
		});
	}
	onMouseLeave = () => {
		const { data } = this.props;
		const randomNumber = _.random(3);
		this.setState({
			currentBg: data.randomBg[randomNumber]
		});
	}
	render() {
		const { data } = this.props;
		const { currentBg } = this.state;
		return (
			<Link {...data.link} disableBlank bold className="VideoPlay" onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter}>
				<div className="VideoPlay__text">{data.text}</div>
				<div className="VideoPlay__image">
					<img src={currentBg} alt="" />
					<div className="VideoPlay__icon">
						<PlayIcon />
					</div>

				</div>
			</Link>
		);
	}
};

VideoPlay.propTypes = {
	data: PropTypes.object.isRequired,
};

export default VideoPlay;
