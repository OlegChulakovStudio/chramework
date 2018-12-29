import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import TargetBlank from "../../assets/target-blank.svg";
import "./Link.styl";

class Link extends Component {
  handleClick = e => {
    this.props.onClick && this.props.onClick(e);
    if (typeof window !== "undefined") {
      window.isLocationChagned = true;
    }
  };

  render() {
    const {
      to,
      children,
      bold,
      className,
      light,
      href,
      disableBlank,
      noLink,
      noBlank,
      grayBlank,
      ...rest
    } = this.props;
    const linkStyle = classNames([
      "Link",
      className,
      {
        Link_bold: bold,
        Link_light: light,
        Link_external: href && !disableBlank,
        Link_grayBlank: grayBlank
      }
    ]);
    let RenderedComponent = to ? NavLink : href ? "a" : "span";
    let linkProps = {};
    if (to) {
      linkProps = { to };
    } else if (href) {
      linkProps = { href, target: noBlank ? "" : "_blank" };
    }
    if (noLink) {
      RenderedComponent = "span";
    }
    return (
      <RenderedComponent
        {...rest}
        className={linkStyle}
        onClick={this.handleClick}
        {...linkProps}
      >
        {children}
        {((href && !disableBlank) || noLink) && (
          <TargetBlank className="Link__target-blank" />
        )}
      </RenderedComponent>
    );
  }
}

Link.defaultProps = {
  to: undefined,
  href: undefined,
  className: undefined,
  children: null,
  bold: undefined,
  light: undefined,
  noLink: false,
  noBlank: false,
  disableBlank: false,
  grayBlank: false
};

Link.propTypes = {
  to: PropTypes.any,
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  bold: PropTypes.any,
  light: PropTypes.bool,
  noLink: PropTypes.bool,
  noBlank: PropTypes.bool,
  disableBlank: PropTypes.bool,
  grayBlank: PropTypes.bool
};

export default Link;
