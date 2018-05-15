import React, { Component } from 'react';
import classNames from 'classnames';
import { iosVersion } from '../../../utils/devices.js';

import FacebookProvider, { Share } from 'react-facebook';
import ClipboardButton from 'react-clipboard.js';

import FacebookIcon from '../../../assets/player/facebook.svg';
import VkontakteIcon from '../../../assets/player/vkontakte.svg';
import TelegramIcon from '../../../assets/player/telegram.svg';
import CopyIcon from '../../../assets/player/copy.svg';
import ExitIcon from '../../../assets/player/exit.svg';
import ShareIcon from '../../../assets/player/share.svg';

import './ShareBlock.styl';

class ShareBlock extends Component {
	static defaultProps = {};
	static propTypes = {};
	state = {
		isOpen: false,
		clipboarded: false,
	};

	componentDidMount() {
		const initVkButton = require('../../../utils/helpers').initVkButton;
		initVkButton(this.vkButton, this.props.url, false, false, false, true);
	};

	onClipboard = () => {
		this.setState({ clipboarded: true }, () => {
			setTimeout(() => this.setState({ clipboarded: false }), 1000);
		});
	}
	handleClick = () => {
		if (this.props.onClick) {
			this.props.onClick();
		} else {
			this.setState({ isOpen: !this.state.isOpen });
		}
	};
	getVkButtonNode = el => (this.vkButton = el);

	render() {
		const { url, isOpened, className } = this.props;
		const { isOpen, clipboarded } = this.state;

		const shareClass = classNames(['Share', className, { Share_ios: iosVersion() >= 11 }]);
		const innerClass = classNames(['Share__inner', { Share__inner_hidden: clipboarded }]);
		const containerClass = classNames(['Share__container', { Share__container_visible: isOpen || isOpened }]);
		const clipboardedClass = classNames(['Share__clipboard', { Share__clipboard_active: clipboarded }]);

		return (
			<div className={shareClass}>
				<div className={innerClass}>
					<div className={containerClass}>
						<div className="Share__containerInner">
							<FacebookProvider appId="1767820740155733" language="ru_RU">
								<Share href={url}>
									<button type="button" className="Share__button">
										<FacebookIcon />
									</button>
								</Share>
							</FacebookProvider>
							<button type="button" className="Share__button">
								<VkontakteIcon />
								<div ref={this.getVkButtonNode} className="Share__button_hidden" />
							</button>
							<a
								href={`https://t.me/share/url?url=${url}`}
								target="_blank"
								className="Share__button"
							>
								<TelegramIcon />
							</a>
							<ClipboardButton data-clipboard-text={url} className="Share__button" onSuccess={this.onClipboard}>
								<CopyIcon />
							</ClipboardButton>
						</div>
					</div>
					<button type="button" className="Share__button" onClick={this.handleClick}>
						{isOpen || isOpened ? (
							<ExitIcon height={iosVersion() >= 11 ? 23 : 24} />
						) : (
							<ShareIcon height={iosVersion() >= 11 ? 23 : 24} />
						)}
					</button>
					<div className={clipboardedClass}>Скопировано</div>
				</div>
			</div>
		);
	}
}

export default ShareBlock;
