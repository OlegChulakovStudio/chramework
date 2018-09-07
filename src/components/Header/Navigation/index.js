import React, { Component } from 'react';
import reactHtmlParser from 'react-html-parser';

import NavLink from 'react-router-dom/NavLink';
import VacanciesCount from '../VacanciesCount';
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
	render() {

		return (
			<div className="Navigation">
				{this.props.menu && this.props.menu.map(item => {
					return (
						<NavLink
							exact={item.exact}
							className="Navigation__item"
							key={item.url}
							to={item.url}
							isActive={item.activeFunc ? this.isActiveWorks : undefined}
							activeClassName="Navigation__item_active">
							{reactHtmlParser(item.name)}
							{item.vacancies && <VacanciesCount count={this.props.vacanciesCount} />}
						</NavLink>
					);
				})}
				{this.props.listMenu && this.props.listMenu.map(item => {
					return (
						<Link
							className="Navigation__item"
							key={item.url}
							href={item.url}
							disableBlank
							activeClassName="Navigation__item_active">
							{reactHtmlParser(item.name)}
							{item.vacancies && <VacanciesCount count={this.props.vacanciesCount} />}
						</Link>
					);
				})}
			</div>
		);
	}
}

export default Navigation;
