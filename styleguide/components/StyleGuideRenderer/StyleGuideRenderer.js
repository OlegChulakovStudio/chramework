import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';
import Markdown from 'react-styleguidist/lib/rsg-components/Markdown';
import Styled from 'react-styleguidist/lib/rsg-components/Styled';
import { Heading } from '../../../src/index';
import cx from 'classnames';

const styles = ({ color, fontFamily, fontSize, sidebarWidth, mq, space, maxWidth }) => ({
  root: {
    color: color.base,
    backgroundColor: color.baseBackground,
  },
  hasSidebar: {
    paddingLeft: '250px',
    [mq.small]: {
      paddingLeft: 0,
    },
  },
  content: {
    // maxWidth,
    padding: [[space[2], space[4]]],
    margin: [[0, 'auto']],
    [mq.small]: {
      padding: space[2],
    },
    '&> .Heading': {
      marginBottom: '60px',
      paddingTop: '68px',
    },
    '& .isPrimary-0-12': {
      fontSize: '64px'
    },
    '& .CodeMirror': {
      backgroundColor: "#f9f9f9 !important"
    },
    display: 'block',
  },
  sidebar: {
    backgroundColor: "#f9f9f9",
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '250px',
    overflow: 'auto',
    [mq.small]: {
      position: 'static',
      width: 'auto',
      borderWidth: [[1, 0, 0, 0]],
      paddingBottom: space[0],
    },
    '& ul' :{
      padding: '24px'
    },
    '& ul ul' :{
      padding: 0
    },
    '& a::hover': {
      color: color.linkColor
    },
    '& .link-0-66.heading-0-65' :{
      fontWeight: '700',
      margin: "10px 0 0 0",
      padding: '3px 0',
      fontSize: '16px ',
      cursor: 'pointer',
    },
    '& .isChild-0-64' :{
      margin: 0,
      '& a': {
        padding: '3px 0',
        cursor: 'pointer',
        display: "block",
        fontSize: "14px",
      }
    }
  },
  logo: {
    padding: space[2],
    paddingLeft: '24px',
  },
  footer: {
    display: 'block',
    color: color.light,
    fontFamily: fontFamily.base,
    fontSize: fontSize.small,
  },
});

export function StyleGuideRenderer({ classes, title, homepageUrl, children, toc, hasSidebar }) {
  return (
    <div className={cx(classes.root, hasSidebar && classes.hasSidebar)}>
      <main className={classes.content}>
        <Heading level={1}>UI Kit Студии Олега<br/>Чулакова</Heading>
        {children}
        <footer className={classes.footer}>
          <Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
        </footer>
      </main>
      {hasSidebar &&
        <div className={classes.sidebar}>
          <div className={classes.logo}>
            <Logo>
              {title}
            </Logo>
          </div>
          {toc}
        </div>}
    </div>
  );
}

StyleGuideRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool,
};

export default Styled(styles)(StyleGuideRenderer);