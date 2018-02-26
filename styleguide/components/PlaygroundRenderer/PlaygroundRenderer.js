import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'react-styleguidist/lib/rsg-components/Styled';

const styles = ({ space, color, borderRadius }) => ({
	root: {
		marginBottom: '74px'
	},
	preview: {
		border: [[1, color.border, 'solid']],
		borderRadius,
		marginBottom: 15,
		overflow: 'auto'
	},
	controls: {
		display: 'flex',
		alignItems: 'center'
	},
	toolbar: {
		marginLeft: 'auto'
	},
	'@global': {
		'.CodeMirror.CodeMirror pre': {
			fontSize: '14px',
			position: 'relative',
			zIndex: '9'
		},
		'.CodeMirror-scroll.CodeMirror-scroll.CodeMirror-scroll': {
			'overflow': [['auto', '!important']]
		},
		'.CodeMirror-sizer': {
			marginBottom: [[0, '!important']]
		},
		'.cm-s-base16-light div.CodeMirror-selected': {
			backgroundColor: '#eee'
		},
		'[data-preview="SelectField"]': {
			overflow: 'visible'
		},
		'[data-preview="Clients"]': {
			backgroundColor: '#222631'
		},
		'.preview > div': {},
		'.preview > div > div': {
			padding: 20
		}
	}
});

export function PlaygroundRenderer({
	classes,
	name,
	preview,
	tabButtons,
	tabBody,
	toolbar
}) {
	return (
		<div className={classes.root}>
			<div className={`${classes.preview} preview`} data-preview={name}>
				{preview}
			</div>
			<div className={classes.controls}>
				<div className={classes.tabs}>{tabButtons}</div>
				<div className={classes.toolbar}>{toolbar}</div>
			</div>
			<div className={classes.tab}>{tabBody}</div>
		</div>
	);
}

PlaygroundRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	preview: PropTypes.node.isRequired,
	tabButtons: PropTypes.node.isRequired,
	tabBody: PropTypes.node.isRequired,
	toolbar: PropTypes.node.isRequired
};

export default Styled(styles)(PlaygroundRenderer);
