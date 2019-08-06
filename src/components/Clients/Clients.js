import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "../Link/Link";
import "./Clients.styl";

const Demo = "../../assets/clients/sevenFlowers.svg";

const filterDemo = {
  finance: {
    name: "Финансы",
    linkProps: { href: "https://chulakov.ru/clients/#finance" }
  },
  telecom: {
    name: "Телеком",
    linkProps: { href: "https://chulakov.ru/clients/#telecom" }
  },
  ecommerce: {
    name: "E-commerce",
    linkProps: { href: "https://chulakov.ru/clients/#ecommerce" }
  }
};

const demo = [
  {
    icon: Demo,
    type: "finance"
  },
  {
    icon: Demo,
    type: "finance"
  },
  {
    icon: Demo,
    type: "telecom"
  },
  {
    icon: Demo,
    type: "telecom"
  },
  {
    icon: Demo,
    type: "ecommerce"
  },
  {
    icon: Demo,
    type: "ecommerce"
  }
];

class FilterItem extends Component {
  mouseEnter = () => {
    this.props.mouseEnter(this.props.filterKey);
  };
  render() {
    const { label, linkProps } = this.props;
    return (
      <Link
        {...linkProps}
        className="ClientsFilter__item"
        onMouseEnter={this.mouseEnter}
      >
        {label}
      </Link>
    );
  }
}

class Clients extends Component {
  static propTypes = {
    filter: PropTypes.object,
    className: PropTypes.string,
    filterOn: PropTypes.bool,
    list: PropTypes.object,
    row: PropTypes.bool
  };
  static defaultProps = {
    filter: undefined,
    filterOn: false,
    list: undefined,
    className: undefined,
    row: undefined
  };

  state = {
    activeFilter: null
  };

  mouseEnter = key => {
    this.setState({ activeFilter: key });
  };
  mouseLeave = () => {
    this.setState({ activeFilter: null });
  };

  renderIcon = (client, key, activeFilter) => {
    const src = client.icon;
    const itemStyle = classNames([
      "Clients__item",
      {
        Clients__item_disable: activeFilter && activeFilter !== client.type
      }
    ]);
    return (
      <div key={key} className={itemStyle}>
        <img src={src} className="Clients__icon" alt="" />
      </div>
    );
  };
  render() {
    const { activeFilter } = this.state;
    const { filter, filterOn, row, className, clients, ...rest } = this.props;
    const clientsList = clients || demo;
    const filterData = filter || filterDemo;
    const ClientsStyle = classNames([
      "Clients",
      className,
      {
        Clients_filter: filterOn,
        Clients_row: row
      }
    ]);
    return (
      <div {...rest} className={ClientsStyle}>
        <div className="Clients__container">
          {filterOn && (
            <div className="ClientsFilter" onMouseLeave={this.mouseLeave}>
              {Object.keys(filterData).map(key => (
                <FilterItem
                  key={key}
                  label={filterData[key].name}
                  filterKey={key}
                  mouseEnter={this.mouseEnter}
                  linkProps={filterData[key].linkProps}
                />
              ))}
            </div>
          )}
          {clientsList.map((item, i) => this.renderIcon(item, i, activeFilter))}
        </div>
      </div>
    );
  }
}

export default Clients;
