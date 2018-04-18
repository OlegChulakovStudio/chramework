import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Card.styl';

// import TargetBlankHover from '../../assets/newTargetBlankHover.svg';
// import TargetBlank from '../../assets/newTargetBlank.svg';;

const Card = ({ children, className, wide, disabled, gray, gap, quarter, half }) => {
  const cardStyle = classNames('Card', {
    'Card_bigCard': wide,
    'Card_disabled': disabled,
    'Card_gray': gray,
    'Card_gap': gap,
    'Card_quarter': quarter,
    'Card_half': half,
  },
    className
  );
  return (
    <div className={cardStyle}>
      <div className={'Card__inner'}>
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  wide: PropTypes.bool,
  disabled: PropTypes.bool,
  gray: PropTypes.bool,
  gap: PropTypes.bool,
  quarter: PropTypes.bool,
  half: PropTypes.bool,
};

export default Card;
