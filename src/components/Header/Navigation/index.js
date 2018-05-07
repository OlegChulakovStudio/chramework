import React, { Component } from 'react';
import reactHtmlParser from 'react-html-parser';

import NavLink from 'react-router-dom/NavLink';
import VacanciesCount from '../VacanciesCount';


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
				{this.props.menu.map(item => {
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
			</div>
		);
	}
}

export default Navigation;
