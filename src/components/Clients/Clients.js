import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from '../Link/Link';
import Demo from '../../assets/clients/tele2.svg';
import './Clients.styl';

const filterData = {
	finance: {
		name: 'Финансы',
		linkProps: { href: 'https://chulakov.ru/clients/#finance' }
	},
	telecom: {
		name: 'Телеком',
		linkProps: { href: 'https://chulakov.ru/clients/#telecom' }
	},
	ecommerce: {
		name: 'E-commerce',
		linkProps: { href: 'https://chulakov.ru/clients/#ecommerce' }
	},
};

const demo = {
	bcs: {
		icon: Demo,
		type: 'finance'
	},
	tinkoff: {
		icon: Demo,
		type: 'finance'
	},
	'alfa-bank': {
		icon: Demo,
		type: 'telecom'
	},
	otkritie: {
		icon: Demo,
		type: 'telecom'
	},
	'home-credit': {
		icon: Demo,
		type: 'ecommerce'
	},
	tele2: {
		icon: Demo,
		type: 'ecommerce'
	}
}

class FilterItem extends Component {
	mouseEnter = () => {
		this.props.mouseEnter(this.props.label);
	}
	render() {
		const { label } = this.props;
		return (
			<Link
				{...filterData[label].linkProps}
				className="ClientsFilter__item"
				onMouseEnter={this.mouseEnter}
			>
				{filterData[label].name}
			</Link>
		);
	}
}

class Clients extends Component {
	static propTypes = {
		filter: PropTypes.bool,
		list: PropTypes.object,
		reverse: PropTypes.bool,
		row: PropTypes.bool,
	};
	static defaultProps = {
		filter: false,
		list: undefined,
		reverse: undefined,
		row: undefined
	};

	state = {
		activeFilter: null,
	};

	mouseEnter = key => {
		this.setState({ activeFilter: key });
	};
	mouseLeave = () => {
		this.setState({ activeFilter: null });
	};

	renderIcon = (client, name, activeFilter) => {
		const Icon = client.icon;
		const itemStyle = classNames(['Clients__item', {
			Clients__item_disable: activeFilter && activeFilter !== client.type,
		}]);
		return (
			<div key={name} className={itemStyle}>
				<Icon className="Clients__icon" />
			</div>
		);
	};
	render() {
		const { activeFilter } = this.state;
		const { filter, reverse, row, className, ...rest } = this.props;
		const dataList = this.props.list || demo;
		const ClientsStyle = classNames(['Clients', className, {
			Clients_reverse: reverse,
			Clients_filter: filter,
			Clients_row: row,
		}]);
		return (
			<div {...rest} className={ClientsStyle}>
				<div className="Clients__container">
					{filter && (
						<div className="ClientsFilter" onMouseLeave={this.mouseLeave}>
							{Object.keys(filterData).map(key => <FilterItem key={key} label={key} mouseEnter={this.mouseEnter} />)}
						</div>
					)}
					{Object.keys(dataList).map(key => this.renderIcon(dataList[key], key, activeFilter))}
				</div>
			</div>
		);
	}
}

export default Clients;
