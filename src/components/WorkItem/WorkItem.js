import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reactHtmlParser from 'react-html-parser';

import Player from '../Player/Player';
import Paragraph from '../Paragraph/Paragraph';
import WorkTags from '../WorkTags/WorkTags';
import Link from '../Link/Link';

import './WorkItem.styl';

class WorkItem extends Component {
	static propTypes = {
		video: PropTypes.object,
		posters: PropTypes.object.isRequired,
		url: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		tags: PropTypes.array.isRequired,
	};
	static defaultProps = {
		video: undefined,
		posters: undefined,
		url: undefined,
		title: undefined,
		description: undefined,
		tags: undefined,
	}

	renderVisual = () => {
		const { video, posters, url } = this.props;

		return video ? (
			<Player {...video} images={posters} compact />
		) : (
			<Link {...url} disableBlank>
				<img src={posters.thumb} alt="" className="WorkItem__poster WorkItem__poster_thumb" />
				<img src={posters['poster-mini']} alt="" className="WorkItem__poster WorkItem__poster_mini" />
			</Link>
		);
	};
	render() {
		const { title, description, tags, url, video, posters, className, ...rest } = this.props;
		const workItemClasses = classNames(['WorkItem', className, {
			WorkItem_video: video,
			WorkItem_link: !video,
		}]);
		return (
			<div {...rest} className={workItemClasses}>
				<div className="WorkItem__inner">
					<div className="WorkItem__visual">{this.renderVisual()}</div>
					<Link {...url} className="WorkItem__content" disableBlank>
						<div className="WorkItem__header">
							<Paragraph TagName="div" mod="bold" className="WorkItem__title">
								{reactHtmlParser(title)}
							</Paragraph>
							<WorkTags list={tags} />
						</div>
						{description && (
							<Paragraph TagName="div" mod="bodySmall" className="WorkItem__info">
								{reactHtmlParser(description)}
							</Paragraph>
						)}
						<Paragraph TagName="div" mod="boldSmall" className="WorkItem__more">Узнать подробности</Paragraph>
					</Link>
				</div>
			</div>
		);
	}
}

export default WorkItem;
