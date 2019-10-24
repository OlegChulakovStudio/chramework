import React, { Component } from 'react';
import reactHtmlParser from 'react-html-parser';
import LinkScroll from '../../LinkScroll';
import NavLink from 'react-router-dom/NavLink';

import Link from '../../Link/Link';

import './styles.styl';

class Navigation extends Component {
	isActiveWorks = (match, location) => {
		if (this.props.filterList && match) {
			const innerPage = location.pathname.split('/')[2];
			if (innerPage) {
				let findRusult = false;
				this.props.filterList.some(item => {
					if (item === innerPage) {
						findRusult = true;
						return true;
					}
					return false;
				});
				return findRusult;
			}
			return true;
		}
		return false;
	};

	handleClick = e => {
		this.props.onClick && this.props.onClick(e);
		if (typeof window !== 'undefined') {
			window.isLocationChagned = true;
		}
	};

	render() {
		return (
			<div className="Navigation">
				{this.props.menu &&
					this.props.menu.map(item => {
						return !item.hideInMenu ? (
							<NavLink
								onClick={this.handleClick}
								exact={item.exact}
								className="Navigation__item"
								to={item.url}
								key={item.url}
								isActive={item.activeFunc ? this.isActiveWorks : undefined}
								activeClassName="Navigation__item_active"
							>
								{reactHtmlParser(item.name)}
							</NavLink>
						) : (
							<Link
								className="Navigation__item"
								key={item.url}
								href={item.url}
								disableBlank
							>
								{reactHtmlParser(item.name)}
							</Link>
						);
					})}

				{this.props.listMenu &&
					this.props.listMenu.map(item => {
						return (
							<Link
								className="Navigation__item"
								key={item.url}
								href={item.url}
								disableBlank
								activeClassName="Navigation__item_active"
							>
								{reactHtmlParser(item.name)}
							</Link>
						);
					})}

				{this.props.scrollMenu &&
					this.props.scrollMenu.map(item => {
						return (
							<LinkScroll
								className="Navigation__item"
								key={item.url}
								offsetTop={80}
								duration={550}
								to={item.url}
								ease="easeInOutQuint"
								active="Navigation__item_active"
								toHash
								isHidden={item.isHidden}
							>
								{reactHtmlParser(item.name)}
							</LinkScroll>
						);
					})}
			</div>
		);
	}
}

export default Navigation;
