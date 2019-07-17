import React, { Component } from "react";
import reactHtmlParser from "react-html-parser";
import LinkScroll from "../../LinkScroll";
import NavLink from "react-router-dom/NavLink";
import VacanciesCount from "../VacanciesCount";
import Link from "../../Link/Link";

import "./styles.styl";

class Navigation extends Component {
  isActiveWorks = (match, location) => {
    if (this.props.filterList && match) {
      const innerPage = location.pathname.split("/")[2];
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
    if (typeof window !== "undefined") {
      window.isLocationChagned = true;
    }
  };

  render() {
    return (
      <div className="Navigation">
        {this.props.menu &&
          this.props.menu.map((item, i) => {
            const key = `navLink-${i}`;
            return !item.hideInMenu && !item.onlyMobile ? (
              <NavLink
                onClick={this.handleClick}
                exact={item.exact}
                className="Navigation__item"
                to={item.url}
                key={key}
                isActive={item.activeFunc ? this.isActiveWorks : undefined}
                activeClassName="Navigation__item_active"
              >
                {reactHtmlParser(item.name)}
                {item.vacancies && (
                  <VacanciesCount count={this.props.vacanciesCount} />
                )}
              </NavLink>
            ) : (
              !item.onlyMobile && (
                <Link
                  key={key}
                  className="Navigation__item"
                  disableBlank={item.disableBlank}
                  activeClassName="Navigation__item_active"
                  {...item.url}
                >
                  {reactHtmlParser(item.name)}
                </Link>
              )
            );
          })}

        {this.props.listMenu &&
          this.props.listMenu.map(item => {
            return (
              !item.onlyMobile && (
                <Link
                  className="Navigation__item"
                  key={item.url}
                  href={item.url}
                  disableBlank
                  activeClassName="Navigation__item_active"
                >
                  {reactHtmlParser(item.name)}
                  {item.vacancies && (
                    <VacanciesCount count={this.props.vacanciesCount} />
                  )}
                </Link>
              )
            );
          })}

        {this.props.scrollMenu &&
          this.props.scrollMenu.map(item => {
            return (
              <LinkScroll
                className="Navigation__item"
                key={item.url}
                offsetTop={84}
                duration={550}
                to={item.url}
                ease="easeInOutQuint"
                active="Navigation__item_active"
              >
                {reactHtmlParser(item.name)}
                {item.vacancies && (
                  <VacanciesCount count={this.props.vacanciesCount} />
                )}
              </LinkScroll>
            );
          })}
      </div>
    );
  }
}

export default Navigation;
