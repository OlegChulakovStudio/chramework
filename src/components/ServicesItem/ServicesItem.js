import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineMax, Linear } from 'gsap';
import Link from '../Link/Link';
import reactHtmlParser from 'react-html-parser';
import './ServicesItem.styl';

const RenderComponent = ({ children, linkProps, ...rest }) =>
	linkProps ? (
		<Link {...rest} {...linkProps} className="ServicesItem">
			{children}
		</Link>
	) : (
		<div {...rest} className="ServicesItem">
			{children}
		</div>
	);

class ServicesItem extends Component {
	static propTypes = {
		animation: PropTypes.object,
		label: PropTypes.string,
		linkProps: PropTypes.object,
		icon: PropTypes.func,
		error: PropTypes.bool
	};

	componentDidMount() {
		if (this.props.animation) {
			this.initAnimate()
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.animation !== nextProps.animation && nextProps.animation) {
			this.initAnimate();
		}
	}

	componentWillUnmount() {
		if (this.animation) {
			this.animation.tl.kill();
		}
	}

	initAnimate = () => {
		this.lottie = require('lottie-web');
		this.animation = {};
		this.animation.animData = this.props.animation.animData;
		this.animation.tl = this.getTlAnimIcon();
	}

	getTlAnimIcon = () => {
		if (this.animation && this.block) {
			const tl = new TimelineMax({ paused: true });

			const progressBegin = { frame: 0 };
			const anim = this.lottie.loadAnimation({
				container: this.block,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				animationData: this.animation.animData,
			});

			this.animation.complete = true;
			tl.to(progressBegin, anim.totalFrames / anim.frameRate, {
				frame: anim.totalFrames - 1,
				ease: Linear.easeNone,
				onUpdate: () => {
					anim.goToAndStop(progressBegin.frame, true);
				},
				onComplete: () => {
					this.animation.complete = true;
				},
			});

			return tl;
		}
	};

	onEnter = () => {
		if (this.animation) {
			const { complete, mouseEnter } = this.animation;

			if (complete && !mouseEnter) {
				this.animation.complete = false;
				this.animation.tl.progress(0).play();
			}
			this.animation.mouseEnter = true;
		}
	};
	onExit = () => {
		if (this.animation) {
			const { mouseEnter } = this.animation;
			if (mouseEnter) {
				this.animation.mouseEnter = false;
			}
		}
	};
	refFunc = block => {
		this.block = block;
	};

	animIconRender = () => {
		return (
			<RenderComponent
				onMouseEnter={this.onEnter}
				onMouseLeave={this.onExit}
				onTouchStart={this.onEnter}
				onTouchEnd={this.onExit}
				key={this.props.label}
				className="ServicesItem"
				linkProps={this.props.linkProps}
			>
				<div ref={this.refFunc} className="ServicesItem__icon" />
				<div className="ServicesItem__label">{reactHtmlParser(this.props.label)}</div>
			</RenderComponent>
		);
	};

	staticIconRender = () => {
		const Icon = this.props.icon;
		return (
			<RenderComponent
				key={this.props.label}
				className="ServicesItem"
				linkProps={this.props.linkProps}
			>
				<Icon className="ServicesItem__icon ServicesItem__icon_static"/>
				<div className="ServicesItem__label">{reactHtmlParser(this.props.label)}</div>
			</RenderComponent>
		)
	};

	render() {
		return this.props.animation && !this.props.error ? this.animIconRender() : this.staticIconRender();
	}
}

export default ServicesItem;
