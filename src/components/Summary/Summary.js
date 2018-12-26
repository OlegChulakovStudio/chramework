import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import reactHtmlParser from "react-html-parser";

import Paragraph from "../Paragraph/Paragraph";
import Link from "../Link/Link";

import "./Summary.styl";

import defaultData from "./data.json";

const production = {
  external: { href: "https://chulakov.ru/life/top5" },
  internal: { to: { pathname: "/life/top5", state: { fromHome: true } } }
};
const design = {
  external: { href: "https://chulakov.ru/life/best-design-studio" },
  internal: {
    to: { pathname: "/life/best-design-studio", state: { fromHome: true } }
  }
};
const usability = {
  external: { href: "https://chulakov.ru/life/best-usability" },
  internal: {
    to: { pathname: "/life/best-usability", state: { fromHome: true } }
  }
};
const keyperson = {
  external: { href: "https://chulakov.ru/life/top5-keyperson" },
  internal: {
    to: { pathname: "/life/top5-keyperson", state: { fromHome: true } }
  }
};

const Summary = ({ awards, className, external, data, ...rest }) => {
  const mainData = data || defaultData;
  const blockStyle = classNames([
    "Summary",
    className,
    {
      Summary_awards: awards
    }
  ]);

  const productionLink = external ? production.external : production.internal;
  const designLink = external ? design.external : design.internal;
  const usabilityLink = external ? usability.external : usability.internal;
  const keypersonLink = external ? keyperson.external : keyperson.internal;
  const links = {
    usability: usabilityLink,
    design: designLink,
    production: productionLink,
    keyperson: keypersonLink
  };
  return (
    <div {...rest} className={blockStyle}>
      <div className="Summary__inner">
        {mainData.items.map((item, key) => {
          const itemKey = `keyItem-${key}`;
          const linkProps = links[item.type] && links[item.type];
          const notStat = item.type !== "statistic";
          const linkStyle = classNames([
            "Summary__item",
            {
              Summary__item_medal: item.medal,
              Summary__item_medal1: item.top1,
              Summary__item_medal5: item.top5,
              Summary__item_medal9: item.top9,
              Summary__item_goldenSite: item.goldenSite,
              Summary__item_tagline: item.tagline,
              Summary__item_keyperson: item.keyperson,
              Summary__item_counter: item.counter,
              Summary__item_experience: item.experience,
              Summary__item_specialists: item.specialists
            }
          ]);
          return notStat ? (
            <Link
              key={itemKey}
              {...linkProps}
              disableBlank
              className={linkStyle}
            >
              <div className="Summary__content">
                <Paragraph mod="boldMedium" className="Summary__title">
                  {reactHtmlParser(item.title)}
                </Paragraph>
              </div>
            </Link>
          ) : (
            !awards && (
              <div key={itemKey} className={linkStyle}>
                <div className="Summary__number">{item.number}</div>
                <Paragraph className="Summary__title" mod="boldMedium">
                  {reactHtmlParser(item.title)}
                </Paragraph>
              </div>
            )
          );
        })}
      </div>
      <div className="Summary__notes">
        <Paragraph className="Summary__notes-item">
          <span>*</span>
          {reactHtmlParser(` ${mainData.notes.first}`)}
        </Paragraph>
        <Paragraph className="Summary__notes-item">
          <span>**</span>
          {reactHtmlParser(` ${mainData.notes.second}`)}
        </Paragraph>
        <Paragraph className="Summary__notes-item">
          <span>***</span>
          {reactHtmlParser(` ${mainData.notes.third}`)}
        </Paragraph>
      </div>
    </div>
  );
};
Summary.defaultProps = {
  awards: undefined,
  external: undefined,
  data: undefined
};
Summary.propTypes = {
  awards: PropTypes.bool,
  external: PropTypes.bool,
  data: PropTypes.object
};

export default Summary;
