import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Link from '../Link/Link.js';

import './Card.styl';

import TargetBlankHover from '../../assets/newTargetBlankHover.svg';
import TargetBlank from '../../assets/newTargetBlank.svg';

const Card = ({ children, className, disabled, gray, gap, quarter, half, link }) => {
  const cardStyle = classNames('Card', {
    'Card_disabled': disabled,
    'Card_gray': gray,
    'Card_gap': gap,
    'Card_quarter': quarter,
    'Card_half': half,
    'Card_isLink': link,
  },
    className
  );
  const RenderComponent = link ? Link : 'div';
  const linkProps = link ? {
    ...link,
    disableBlank: true
  } : {};
  return (
    <RenderComponent {...linkProps} className={cardStyle}>
      <div className={'Card__inner'}>
        {children}
        {link && link.href && <TargetBlankHover className={classNames('Card__targetBlank', 'Card__targetBlank_hover')} />}
        {link && link.href && <TargetBlank className={classNames('Card__targetBlank', 'Card__targetBlank_normal')} />}
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
  link: PropTypes.object,
};

export default Card;
