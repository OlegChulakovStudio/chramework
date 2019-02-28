import React, { Component } from "react";
import PropTypes from "prop-types";
import reactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import classNames from "classnames";

import { NavLink } from "react-router-dom";
import VacanciesCount from "../VacanciesCount";
import Moscow from "../../../assets/contacts/moscow.svg";
import Rostov from "../../../assets/contacts/rostov.svg";

import { actions } from "../../modules/ui.js";

import "./styles.styl";

const icons = {
  moscow: Moscow,
  rostov: Rostov
};

const mapDispatchToProps = dispatch => ({
  menuClose: () => dispatch(actions.menuClose())
});

class MenuInner extends Component {
  linkClick = () => {
    this.props.menuClose();
  };

  render() {
    const { notFound } = this.props;
    const blockStyle = classNames({
      MenuInner: true,
      MenuInner_notFound: notFound
    });

    let menuData = [];
    const menuArray = this.props.menu;
    menuArray.forEach(item => {
      !item.hideInMenu && menuData.push(item);
    });
    return (
      <div className="Menu">
        <div className="Menu__inner">
          <div className={blockStyle}>
            <div className="MenuInner__container">
              {this.props.menu &&
                menuData.map((item, i) => {
                  const subListStyle = classNames({
                    MenuInner__sublist: true,
                    MenuInner__sublist_main: item.main
                  });
                  const key = `menuItem-${i}`;
                  return (
                    <div key={key} className="MenuInner__item">
                      {item.url && (
                        <NavLink
                          className="MenuInner__link"
                          to={item.url}
                          onClick={this.linkClick}
                        >
                          {reactHtmlParser(item.name)}
                          {item.vacancies && (
                            <VacanciesCount
                              isMobile
                              count={this.props.vacanciesCount}
                            />
                          )}
                        </NavLink>
                      )}
                      {item.href && (
                        <a
                          className="MenuInner__link"
                          href={item.href}
                          target="_blank"
                          onClick={this.linkClick}
                        >
                          {reactHtmlParser(item.name)}
                        </a>
                      )}
                      {item.sublist && (
                        <ul className={subListStyle}>
                          {item.sublist.map((link, i) => {
                            const itemStyle = classNames({
                              MenuInner__sublink: true,
                              MenuInner__sublink_inmobile: link.inMobile,
                              MenuInner__sublink_hidden: link.isHidden,
                              MenuInner__sublink_phone: link.icon,
                              MenuInner__sublink_rostov: link.icon === "rostov",
                              MenuInner__sublink_moskow:
                                link.icon && link.icon !== "rostov"
                            });
                            const key = `menuLink-${i}`;
                            const Icon = icons[link.icon];
                            const element =
                              link.tel || link.mailto || link.href ? (
                                <a
                                  key={key}
                                  className={itemStyle}
                                  target={link.href ? "_blank" : ""}
                                  href={
                                    link.href
                                      ? link.href
                                      : `${
                                          link.tel ? "tel:" : "mailto:"
                                        }${link.tel || link.mailto}`
                                  }
                                >
                                  {reactHtmlParser(link.name)}
                                  <div className="MenuInner__sublink-icon">
                                    {link.icon && <Icon />}
                                  </div>
                                </a>
                              ) : (
                                <NavLink
                                  key={key}
                                  className={itemStyle}
                                  onClick={this.linkClick}
                                  to={link.url}
                                >
                                  {reactHtmlParser(link.name)}
                                  {link.vacancies && <VacanciesCount />}
                                </NavLink>
                              );
                            return element;
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MenuInner.propTypes = {
  notFound: PropTypes.bool,
  menuClose: PropTypes.func
};

export default connect(
  null,
  mapDispatchToProps
)(MenuInner);
