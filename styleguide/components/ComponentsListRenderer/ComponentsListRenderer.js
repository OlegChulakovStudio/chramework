import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'react-styleguidist/lib/rsg-components/Link';
import Styled from 'react-styleguidist/lib/rsg-components/Styled';

const styles = ({ color, fontFamily, fontSize, space, mq }) => ({
  list: {
    margin: 0,
  },
  item: {
    color: color.link,
    display: 'block',
    margin: 0,
    fontFamily: fontFamily.base,
    fontSize: fontSize.base,
    listStyle: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transition: 'background-color 0.35s',
    '&:hover': {
      isolate: false,
      backgroundColor: '#eee'
    },
    '& > a': {
      display: 'block',
      padding: '12px 0 12px ' + space[2] + 'px !important',
      minHeight: '20px !important'
    }
  },
  isChild: {
    [mq.small]: {
      display: 'inline-block',
      margin: [[0, space[1], 0, 0]],
    },
  },
  heading: {
    color: color.base,
    marginTop: space[1],
    fontFamily: fontFamily.base,
    fontWeight: 'bold',
  },
});

export function ComponentsListRenderer({ classes, items }) {
  items = items.filter(item => item.name);

  if (!items.length) {
    return null;
  }

  return (
    <ul className={classes.list}>
      {items.map(({ heading, name, slug, content }) =>
        <li
          className={cx(classes.item, (!content || !content.props.items.length) && classes.isChild)}
          key={name}
        >
          <Link className={cx(heading && classes.heading)} href={`#${slug}`}>
            {name}
          </Link>
          {content}
        </li>
      )}
    </ul>
  );
}

ComponentsListRenderer.propTypes = {
  items: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Styled(styles)(ComponentsListRenderer);