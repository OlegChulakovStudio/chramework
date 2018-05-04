import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { getBodyScrollTop } from '../../libs/scrollLock';
import { Logo } from 'chramework';
import Navigation from './Navigation';
import Hamburger from './Hamburger';
import ModalMenuContainer from './ModalMenuContainer';
import Icon from 'components/Icon';
import { actions as uiActions } from 'state/ui.js';
import './styles.styl';

const mapStateToProps = state => {
	return {
		...state.ui,
		modalIsOpened: state.modal.modalIsOpened,
		// Для перерендера Navigation
		pathname: get(state.router, 'location.pathname', ''),
	};
};
const mapDispatchToProps = dispatch => ({
	menuOpen: () => dispatch(uiActions.menuOpen()),
	menuClose: () => dispatch(uiActions.menuClose()),
});

class Header extends Component {
	static direction = 'FORWARD';

	constructor(props) {
		super(props);
		this.state = {
			localMod: '',
		};
	}
	componentDidMount() {
		this.scroll = 0;
		this.top = 0;
		this.scrollTop = getBodyScrollTop();
		document.addEventListener('scroll', this.toggleHeader, false);
		document.addEventListener('touchmove', this.toggleHeader, false);
		this.headerHeight = this.block.getBoundingClientRect().height;
		this.checkLocalMod(this.scrollTop);
	}

	componentDidUpdate = prevProps => {
		if (
			this.props.pathname !== prevProps.pathname ||
			this.props.modalIsOpened !== prevProps.modalIsOpened
		) {
			this.top = 0;
			this.block.style.top = `${this.top}px`;
		}
		if (this.props.pathname !== prevProps.pathname) {
			this.setState({ localMod: 'transitionLock' }, () => {
				setTimeout(() => {
					if (this.state.localMod === 'transitionLock') {
						this.setState({ localMod: '' });
					}
				}, 100);
			});
		}
	};

	toggleHeader = () => {
		const currScrollTop = getBodyScrollTop();

		if (currScrollTop > this.scrollTop) {
			this.direction = 'FORWARD';
		} else {
			this.direction = 'REVERSE';
		}
		this.scrollAction(currScrollTop);
		this.scrollTop = currScrollTop;
	};

	onClick = () => {
		const { menuIsOpened, menuOpen, menuClose, redirectUrl, onHamburgerClick } = this.props;

		if (redirectUrl) {
			onHamburgerClick(redirectUrl);
		} else if (!menuIsOpened) {
			menuOpen();
		} else {
			menuClose();
		}
	};

	toogleMenu = () => {
		const { menuIsOpened, menuOpen, menuClose } = this.props;

		if (!menuIsOpened) {
			menuOpen();
		} else {
			menuClose();
		}
	};

	menuClose = () => {
		if (this.props.menuIsOpened) {
			this.props.menuClose();
		}
	};

	scrollAction = scroll => {
		const delta = this.scroll - scroll;
		if (window.lockScrollEvents) {
			return;
		}
		if (
			(scroll > 0 && this.direction === 'FORWARD' && this.top >= -this.headerHeight) ||
			(scroll > 0 && this.direction === 'REVERSE' && this.top <= 0)
		) {
			let top = this.top + delta;
			if (top > 0) {
				top = 0;
			}
			if (top < -this.headerHeight) {
				top = -this.headerHeight;
			}
			this.top = top;
			if (this.block) {
				this.block.style.top = `${top}px`;
			}
		}
		if (scroll < this.headerHeight) {
			this.top = 0;
			if (this.block) {
				this.block.style.top = `${0}px`;
			}
		}
		this.scroll = scroll;

		this.checkLocalMod(scroll);
	};

	checkLocalMod = scroll => {
		if (this.props.mod === 'work') {
			if (this.direction === 'FORWARD') {
				const sectorFullScreen = document.getElementsByClassName('Sector_fullScreen')[0];
				if (sectorFullScreen && scroll >= sectorFullScreen.clientHeight) {
					if (this.state.localMod !== 'light') {
						this.setState({ localMod: 'light' });
					}
				}
			} else if (scroll <= 0) {
				this.setState({ localMod: '' });
			}
		}
		if (scroll >= this.headerHeight) {
			if (this.state.scrollMod !== 'small') {
				this.setState({ scrollMod: 'small' });
			}
		} else if (this.state.scrollMod === 'small') {
			this.setState({ scrollMod: '' });
		}
	};

	getHeaderNode = el => {
		this.block = el;
	};

	render() {
		const {
			menuIsOpened,
			mod,
			page,
			modalIsOpened,
			scrollSize,
			redirectUrl,
			ingroup,
			text,
			scrollPanelOnPage,
		} = this.props;
		const { localMod, scrollMod } = this.state;

		const styles = classNames({
			Header: true,
			[`Header_${mod}`]: mod,
			[`Header_${page}`]: page,
			[`Header_${localMod}`]: localMod,
			[`Header_${scrollMod}`]: scrollMod,
			Header_topWork: page === 'workItem' && localMod !== 'light',
			Header_lab: page === 'lab',
			Header_fix: menuIsOpened,
			Header_ingroup: ingroup,
		});

		return (
			<header
				className={styles}
				style={{ right: `${modalIsOpened && scrollPanelOnPage ? scrollSize : 0}px` }}
				ref={this.getHeaderNode}>
				<div className="Header__inner">
					<div className="Header__logo">
						<Logo
							linkProps={page ? { to: '/' } : undefined}
							type={mod === 'dark' || mod === 'work' ? 'light' : ''}
							onClick={this.menuClose}
							ingroup={ingroup}
						/>
						<Icon glyph={partners} />
					</div>
					<div className="Header__content">
						<Navigation
							filterList={this.props.filterList}
							vacanciesCount={this.props.vacanciesCount}
						/>
					</div>
					<Hamburger
						mod={mod}
						menuIsOpened={menuIsOpened || redirectUrl.length > 0}
						onClick={this.onClick}
					/>
				</div>
				<ModalMenuContainer vacanciesCount={this.props.vacanciesCount} />
			</header>
		);
	}
}

Header.propTypes = {
	mod: PropTypes.string,
	menuIsOpened: PropTypes.bool,
	menuClose: PropTypes.func,
	onHamburgerClick: PropTypes.func,
	redirectUrl: PropTypes.string,
	menuOpen: PropTypes.func,
	modalIsOpened: PropTypes.bool,
	scrollSize: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
