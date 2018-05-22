import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import ExitIcon from '../../../../assets/player/exit.svg';
import GearIcon from '../../../../assets/player/gear.svg';

import { isMobile, iosVersion } from '../../../../utils/devices.js';
import './ChangeQuality.styl';

class ButtonQuality extends Component {
	onClick = () => this.props.onClick(this.props.name);

	render() {
		return (
			<button className={this.props.className} onClick={this.onClick}>
				{this.props.children}
			</button>
		)
	}
}
class ChangeQuality extends Component {
	state = {
		isMouseEntered: false,
	};
	onMouseEnter = () => {
		if (this.props.onMouseEnter) {
			this.props.onMouseEnter();
		} else {
			this.setState({ isMouseEntered: true });
		}
	};
	onMouseLeave = () => {
		if (this.props.onMouseLeave) {
			this.props.onMouseLeave();
		} else {
			this.setState({ isMouseEntered: false });
		}
	};
	onClick = () => {
		if (this.props.onClick) {
			this.props.onClick();
		} else {
			this.setState({ isMouseEntered: !this.state.isMouseEntered });
		}
	};
	renderComponent() {
		const { qualityList, isOpened, className, currentQuality, onChangeQuality, renderNode, ...rest } = this.props;
		const { isMouseEntered } = this.state;

		const changeQualityClass = classNames(['ChangeQuality', className, {
			ChangeQuality_visible: isOpened || isMouseEntered,
			ChangeQuality_ios: iosVersion() >= 11,
		}]);

		return (
			<div
				{...rest}
				className={changeQualityClass}
				onMouseEnter={!isMobile() ? this.onMouseEnter : null}
				onMouseLeave={!isMobile() ? this.onMouseLeave : null}
				onClick={isMobile() ? this.onClick : null}
			>
				<div className="ChangeQuality__inner">
					<div className="ChangeQuality__container">
						<div className="ChangeQuality__containerInner">
							{Object.keys(qualityList).map(key => {
								const { label, name } = qualityList[key];
								return (
									<ButtonQuality
										key={name}
										className={classNames(['ChangeQuality__buttonName', {
											ChangeQuality__buttonName_active: currentQuality === name
										}])}
										onClick={onChangeQuality}
										name={name}
									>
										{label}
									</ButtonQuality>
								);
							})}
						</div>
					</div>
					<button
						type="button"
						className={classNames({
							ChangeQuality__button: true,
							ChangeQuality__button_ios: iosVersion() >= 11,
						})}
					>
						{iosVersion() >= 11 ? (
							isOpened || isMouseEntered ? (
								<ExitIcon height={23} width={23} style={{ padding: 4.5 }} />
							) : (
								<GearIcon height={32} width={32} />
							)
						) : (
							<GearIcon height={32} width={32} />
						)}
					</button>
				</div>
			</div>
		);
	}
	render() {
		return !(iosVersion() >= 11)
			? ReactDOM.createPortal(this.renderComponent(), this.props.renderNode)
			: this.renderComponent();
	}
}

export default ChangeQuality;
