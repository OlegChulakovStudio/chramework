import React from 'react';
import PropTypes from 'prop-types';
import { Logo as StyledLogo } from '../../../src/index';
import Styled from 'react-styleguidist/lib/rsg-components/Styled';

const styles = ({ color, fontFamily, fontSize }) => ({
  logo: {
    color: color.base,
    margin: 0,
    fontFamily: fontFamily.base,
    fontSize: fontSize.h4,
    fontWeight: 'normal',
    textDecoration: 'none'
  },
});

export function LogoRenderer({ classes, children }) {
  return (
    <h1 className={classes.logo}>
      <StyledLogo url="http://chulakov.ru" external/>
    </h1>
  );
}

LogoRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);