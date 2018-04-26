import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'react-styleguidist/lib/rsg-components/Styled';

export function SectionHeadingRenderer({
  classes,
  children,
  toolbar,
  id,
  href,
  primary,
  deprecated,
}) {
  const Tag = primary ? 'h1' : 'h2';
  const headingClasses = cx(classes.heading, {
    [classes.isPrimary]: primary,
    [classes.isDeprecated]: deprecated,
  });
  console.log(classes,
    children,
    toolbar,
    id,
    href,
    primary,
    deprecated,);

  return (
    <Tag id={id} className={classes.root}>
      <a href={href} className={headingClasses}>
        {children}
      </a>
      <div className={classes.toolbar}>
        {toolbar}
      </div>
    </Tag>
  );
}

export const styles = ({ color, space, fontSize, fontFamily }) => ({
  root: {
    display: 'flex',
    marginBottom: space[1],
    alignItems: 'center',
  },
  heading: {
    color: color.link,
    fontSize: fontSize.h2,
    fontFamily: fontFamily.base,
    fontWeight: 'bold',
    '&:hover, &:active': {
      isolate: false,
      color: color.linkHover
    },
  },
  isPrimary: {
    fontSize: fontSize.h1,
  },
  isDeprecated: {
    textDecoration: 'line-through',
    color: color.light,
  },
  toolbar: {
    marginLeft: 'auto',
  },
});

SectionHeadingRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  toolbar: PropTypes.node,
  id: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  deprecated: PropTypes.bool,
};

export default Styled(styles)(SectionHeadingRenderer);