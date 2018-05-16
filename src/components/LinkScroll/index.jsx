import { createElement } from 'react';
import ScrollAnim from 'rc-scroll-anim';
const Link = ScrollAnim.Link;

class LinkScroll extends Link {
	static timer = 0;

	remActive = () => {
		if (this.state.active) {
			this.setState({ active: false }, () => {
				if (this.props.toHash) {
					this.props.linkDisactive(this.props.to);

					clearTimeout(this.timer);
					this.timer = setTimeout(() => {
						if (!this.props.checkLocation()) {
							window.history.replaceState(null, window.title, window.location.pathname);
						}
					}, 10);
				}
			});
		}
	};
	addActive = () => {
		if (!this.state.active) {
			this.setState({ active: true }, () => {
				if (this.props.toHash) {
					this.props.linkAactive(this.props.to);
					window.history.replaceState(null, window.title, `#${this.props.to}`);
				}
			});
		}
	};
	render() {
		const active = this.state.active ? this.props.active : '';
		const onClick = this.props.onClick;
		const deleteProps = [
			'component',
			'duration',
			'active',
			'showHeightActive',
			'ease',
			'toShowHeight',
			'offsetTop',
			'targetId',
			'to',
			'toHash',
			'linkDisactive',
			'checkLocation',
			'linkAactive',
		];
		const props = {
			...this.props,
			onClick: e => {
				onClick(e);
				this.onClick(e);
			},
		};
		deleteProps.forEach(key => delete props[key]);
		const reg = new RegExp(active, 'ig');
		const className = props.className || '';
		props.className =
			className.indexOf(active) === -1
				? `${className} ${active}`.trim()
				: className.replace(reg, '').trim();
		return createElement(this.props.component, props);
	}
}

export default LinkScroll;
