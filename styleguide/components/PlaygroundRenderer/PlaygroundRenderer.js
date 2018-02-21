import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'react-styleguidist/lib/rsg-components/Styled';

const styles = ({ space, color, borderRadius }) => ({
  root: {
    marginBottom: '74px'
  },
  preview: {
    outline: [[1, color.border, 'solid']],
    borderRadius,
    margin: [[space[2], space[2], space[2] + 15, space[2]]],
    outlineOffset: 15,
    overflow: 'auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  toolbar: {
    marginLeft: 'auto',
  },
  '@global': {
    '.CodeMirror.CodeMirror pre': {
      fontSize: '14px',
      position: 'relative',
      zIndex: '9'
    },
    '.cm-s-base16-light div.CodeMirror-selected': {
      backgroundColor: '#eee',
    },
    '[data-preview="SelectField"], [data-preview="Heading"], [data-preview="Spinner"]': {
      overflow: 'visible'
    }
  }
});

export function PlaygroundRenderer({ classes, name, preview, tabButtons, tabBody, toolbar }) {
  return (
    <div className={classes.root}>
      <div className={classes.preview} data-preview={name}>
        {preview}
      </div>
      <div className={classes.controls}>
        <div className={classes.tabs}>
          {tabButtons}
        </div>
        <div className={classes.toolbar}>
          {toolbar}
        </div>
      </div>
      <div className={classes.tab}>
        {tabBody}
      </div>
    </div>
  );
}

PlaygroundRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  preview: PropTypes.node.isRequired,
  tabButtons: PropTypes.node.isRequired,
  tabBody: PropTypes.node.isRequired,
  toolbar: PropTypes.node.isRequired,
};

export default Styled(styles)(PlaygroundRenderer);