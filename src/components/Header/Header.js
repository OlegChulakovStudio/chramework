/* eslint-disable complexity */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';

// import { actions as uiActions } from 'chramework';

import Logo from '../Logo/Logo';
import Link from '../Link/Link';

import { getBodyScrollTop } from '../../utils/scrollLock';
import LinkScroll from '../LinkScroll';
import Navigation from './Navigation';
import ScrollButton from './ScrollButton';
import Hamburger from './Hamburger';

import './styles.styl';

const mapStateToProps = (state, ownProps) => ({
	...state.ui,
	modalIsOpened: state.modal.modalIsOpened,
	pathname: get(state.router, 'location.pathname', ''),
	...ownProps
});

const mapDispatchToProps = dispatch => ({
	menuOpen: () => dispatch(uiActions.menuOpen()),
	menuClose: () => dispatch(uiActions.menuClose())
});

class Header extends Component {
	static direction = 'FORWARD';

	constructor(props) {
		super(props);
		this.state = {
			localMod: ''
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
		const { menuClose, redirectUrl, onHamburgerClick } = this.props;

		if (redirectUrl) {
			onHamburgerClick(redirectUrl);
		} else {
			menuClose();
		}
	};

	scrollAction = scroll => {
		const delta = this.scroll - scroll;
		if (window.lockScrollEvents) {
			return;
		}
		if (
			(scroll > 0 &&
				this.direction === 'FORWARD' &&
				this.top >= -this.headerHeight) ||
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
		if (scroll <= 0) {
			this.setState({ localMod: '' });
		}
		if (scroll >= this.headerHeight) {
			if (this.state.localMod !== 'top') {
				this.setState({ localMod: 'top' });
			}
		} else if (this.state.localMod === 'top') {
			this.setState({ localMod: '' });
		}
	};

	getHeaderNode = el => {
		this.block = el;
	};

	renderLink = () => {
		const { linkProps } = this.props;
		const El = linkProps.scroll ? LinkScroll : Link;
		const props = linkProps.scroll
			? {
					className: 'Link Link_bold',
					to: linkProps.to,
					offsetTop: 80
			  }
			: {
					bold: true,
					disableBlank: true,
					[linkProps.to ? 'to' : 'href']: linkProps.to || linkProps.href
			  };
		return <El {...props}>{linkProps.text}</El>;
	};

	render() {
		const {
			page,
			modalIsOpened,
			scrollSize,
			redirectUrl,
			ingroup,
			text,
			withoutMenu,
			linkProps,
			scrollPanelOnPage,
			madeinlab,
			mod,
			longNav,
			mark
		} = this.props;
		const { localMod, scrollMod } = this.state;
		const headerMark =
			mark && typeof mark === 'object'
				? mark.map(item => `Header_${item}`)
				: mark
				? `Header_${mark}`
				: '';

		const styles = classNames('Header', headerMark, {
			Header_pinned: this.props.menu || this.props.scrollMenu,
			Header_isLink: this.props.pinned === 'desktop',
			Header_linkScroll: this.props.linkScroll,
			[`Header_${mod}`]: mod,
			[`Header_${scrollMod}`]: scrollMod,
			Header_onTop: localMod !== 'top' && !this.props.notFound,
			Header_lab: page === 'lab',
			Header_ingroup: ingroup || madeinlab,
			Header_longNav: longNav
		});
		const logoMod = !this.props.notFound
			? mod === 'dark' || mod === 'white'
				? 'light'
				: ''
			: '';

		return (
			<header
				className={styles}
				style={{
					right: `${modalIsOpened && scrollPanelOnPage ? scrollSize : 0}px`
				}}
				ref={this.getHeaderNode}
			>
				<div className="Header__inner">
					<div className="Header__logo">
						<Logo
							// linkProps={page ? { to: '/' } : undefined}
							mod={logoMod}
							onClick={this.menuClose}
							ingroup={ingroup}
							madeinlab={madeinlab}
							text={text}
							isBlue={mod === 'white'}
						/>
					</div>
					{(this.props.menu || this.props.scrollMenu) && !withoutMenu && (
						<div className="Header__content">
							<div className="Header__content-inner">
								<Navigation
									filterList={this.props.filterList}
									menu={this.props.menu}
									scrollMenu={this.props.scrollMenu}
								/>
								{this.props.phone && (
									<Link
										href={`tel:${this.props.phone.number}`}
										className="Header__phone"
										disableBlank
										bold
									>
										{this.props.phone.inner}
									</Link>
								)}

								{this.props.linkScroll && (
									<ScrollButton data={this.props.linkScroll} />
								)}
							</div>
						</div>
					)}

					{this.props.menu && (
						<Hamburger
							mod={mod}
							menuIsOpened={redirectUrl.length > 0}
							onClick={this.onClick}
						/>
					)}
					{linkProps && !this.props.menu && this.renderLink()}
					{this.props.children}
				</div>
			</header>
		);
	}
}

Header.defaultProps = {
	menuClose: () => {},
	onHamburgerClick: () => {},
	redirectUrl: '',
	menuOpen: () => {},
	modalIsOpened: false,
	scrollSize: undefined,
	filterList: undefined,
	mod: '',
	menu: undefined,
	scrollMenu: undefined,
	linkScroll: undefined,
	mark: undefined,
	phone: undefined
};

Header.propTypes = {
	menuClose: PropTypes.func,
	onHamburgerClick: PropTypes.func,
	redirectUrl: PropTypes.string,
	menuOpen: PropTypes.func,
	modalIsOpened: PropTypes.bool,
	scrollSize: PropTypes.number,
	filterList: PropTypes.array,
	mod: PropTypes.string,
	menu: PropTypes.array,
	scrollMenu: PropTypes.array,
	children: PropTypes.any,
	linkScroll: PropTypes.object,
	longNav: PropTypes.bool,
	mark: PropTypes.any,
	phone: PropTypes.object,
	notFound: PropTypes.bool
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
