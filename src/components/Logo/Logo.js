import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import reactHtmlParser from "react-html-parser";


import Link from "../Link/Link";
import LogoIcon from "./assets/logo.svg";
import LogoTransparent from "./assets/logo-transparent.svg";
import consulting from "./assets/consulting.svg";
import group from "./assets/group.svg";
import handbook from "./assets/handbook.svg";
import lab from "./assets/lab.svg";
import media from "./assets/media.svg";
import partners from "./assets/partners.svg";
import mobile from "./assets/mobile.svg";

import "./Logo.styl";


const icons = {
  consulting,
  group,
  handbook,
  lab,
  media,
  partners,
  mobile
};
export default class Logo extends Component {
  static propTypes = {
    /** Avaliable values: ['small',''] */
    size: PropTypes.string,
    /** Avaliable values: ['light',''] */
    mod: PropTypes.string,
    /** Avaliable values: ['wh','bl'] */
    mark: PropTypes.string,
    /** Avaliable values: ['black',''] */
    type: PropTypes.string,

    linkProps: PropTypes.object,
    /** set this param to true, if you want to add text after logo */
    text: PropTypes.string,
    /** set this param to true, if you want to add text after logo */
    ingroup: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    madeinlab: PropTypes.bool,
    isBlue: PropTypes.bool,
    menuIsOpened: PropTypes.bool,
  };

  static defaultProps = {
    size: undefined,
    mod: undefined,
    type: undefined,
    text: undefined,
    ingroup: undefined,
    linkProps: undefined,
    madeinlab: undefined,
    mark: undefined,
    menuIsOpened: undefined
  };

  render() {
    const {
      linkProps,
      mod,
      size,
      type,
      className,
      text,
      madeinlab,
      ingroup,
      isBlue,
      mark,
      menuIsOpened,
      ...rest
    } = this.props;
    const currentGroupText =
      typeof ingroup === "object" ? ingroup.text : "Chulakov Group";
    const currentGroupLink =
      typeof ingroup === "object" ? ingroup.url : "https://group.chulakov.ru/";
    const TextIcon = icons[text];

    return (
      <div
        {...rest}
        className={classNames([
          "Logo",
          className,
          {
            [`Logo--${size}`]: size,
            [`Logo--${type}`]: type,
            [`Logo--${mod}`]: mod,
            [`Logo--${mark}`]: mark,
            [`Logo--isBlue`]: isBlue,
            [`Logo--ingroup`]: ingroup || madeinlab
          }
        ])}
      >
        {mark && !menuIsOpened ? <LogoTransparent className="Logo__icon" width={120} height={28} /> : <LogoIcon className="Logo__icon" width={120} height={28} />}


        {text &&
          (TextIcon ? (
            <TextIcon height={28} className="Logo__iconSuffix" />
          ) : (
              <span className="Logo__sufix">{text}</span>
            ))}
        {linkProps && (
          <Link {...linkProps} disableBlank className="Logo__link" />
        )}
        {(ingroup || madeinlab) && (
          <span className="Logo__ingroup">
            {ingroup &&
              reactHtmlParser(
                `в составе <a href="${currentGroupLink}" target="_blank">${currentGroupText}</a>`
              )}
            {madeinlab &&
              reactHtmlParser(
                'сделано в <a href="https://lab.chulakov.ru" target="_blank">Chulakov Lab</a>'
              )}
          </span>
        )}
      </div>
    );
  }
}
