import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
	static propTypes = {
		errorComponent: PropTypes.func.isRequired,
		errorProps: PropTypes.object,
		children: PropTypes.any.isRequired,
	};
	static defaultProps = {
		errorComponent: <div />,
		errorProps: {},
	};
	state = { hasError: false };

	componentDidCatch() {
		this.setState({ hasError: true });
	}

	render() {
		const { ErrorComponent, ...rest } = this.props;
		if (this.state.hasError) {
			return <ErrorComponent {...rest} />;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
