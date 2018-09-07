import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Link from '../Link/Link.js';

import './Card.styl';

import TargetBlankHover from '../../assets/newTargetBlankHover.svg';
import TargetBlank from '../../assets/newTargetBlank.svg';
import Target from '../../assets/newTarget.svg';

const Card = ({ children, className, disabled, gray, gap, quarter, half, link, border, noneBlank, noInter }) => {
  const cardStyle = classNames('Card', {
    'Card_disabled': disabled,
    'Card_gray': gray,
    'Card_gap': gap,
    'Card_quarter': quarter,
    'Card_half': half,
    'Card_isLink': link,
    'Card_border': border,
  },
    className
  );
  const RenderComponent = link ? Link : 'div';
  const linkProps = link ? {
    ...link,
    disableBlank: true,
    noBlank: noneBlank
  } : {};
  const targetBlank = link && link.href && !noneBlank
  return (
    <RenderComponent {...linkProps} className={cardStyle}>
      <div className={'Card__inner'}>
        {children}
        {link && !targetBlank && !noInter && <Target className={classNames('Card__targetBlank', 'Card__targetBlank_inter')} />}
        {link && targetBlank && <TargetBlankHover className={classNames('Card__targetBlank', 'Card__targetBlank_hover')} />}
        {link && targetBlank && <TargetBlank className={classNames('Card__targetBlank', 'Card__targetBlank_normal')} />}
      </div>
    </RenderComponent>
  );
};


Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  gray: PropTypes.bool,
  gap: PropTypes.bool,
  quarter: PropTypes.bool,
  half: PropTypes.bool,
  border: PropTypes.bool,
  noneBlank: PropTypes.bool,
  link: PropTypes.object,
  noInter: PropTypes.bool,
};

export default Card;
