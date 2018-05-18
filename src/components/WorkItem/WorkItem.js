import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reactHtmlParser from 'react-html-parser';
import { pluralize } from '../../utils/helpers';

import Player from '../Player/Player';
import Paragraph from '../Paragraph/Paragraph';
import WorkTags from '../WorkTags/WorkTags';
import Link from '../Link/Link';

import './WorkItem.styl';
import Medal from './medal.svg';

class WorkItem extends Component {
	static propTypes = {
		video: PropTypes.object,
		posters: PropTypes.object.isRequired,
		url: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		onDark: PropTypes.bool,
		tags: PropTypes.array.isRequired,
		awards: PropTypes.array,
	};
	static defaultProps = {
		video: undefined,
		posters: undefined,
		url: undefined,
		onDark: false,
		title: undefined,
		description: undefined,
		tags: undefined,
		awards: undefined,
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
		const { title, description, onDark, tags, url, video, posters, className, awards, ...rest } = this.props;
		const workItemClasses = classNames(['WorkItem', className, {
			WorkItem_video: video,
			WorkItem_link: !video,
			WorkItem_onDark: onDark,
		}]);
		const RenderComponent = url ? Link : "div";
		const dataAwards = awards || [
			{
				name: "Золотой сайт",
				link: "Золото"
			},
			{
				name: "Золотой сайт",
				link: "Золото"
			},
			{
				name: "Золотой сайт",
				link: "Золото"
			}
		];
		const currentCountAwards = dataAwards.length === 1 ? dataAwards[0].link : `× ${dataAwards.length} ${pluralize(dataAwards.length, ['награда', 'награды', 'наград'])}`;

		return (
			<div {...rest} className={workItemClasses}>
				<div className="WorkItem__inner">
					<div className="WorkItem__visual">{this.renderVisual()}</div>
					<RenderComponent {...url} className="WorkItem__content" disableBlank>
						<div className="WorkItem__header">
							<Paragraph TagName="div" mod="bold" className="WorkItem__title">
								{reactHtmlParser(title)}
							</Paragraph>
							{tags && <WorkTags list={tags} />}
						</div>
						{(description || dataAwards) && (
							<div className="WorkItem__info">
								{description && <Paragraph TagName="div" mod="bodySmall" className="WorkItem__info-text">
									{reactHtmlParser(description)}
								</Paragraph>}
								{dataAwards.length > 0 && <div className="WorkItem__awards">
									<Medal />
									<Paragraph TagName="div" mod="bodySmall" className="WorkItem__awards-count">
										{currentCountAwards}
									</Paragraph>
								</div>}
							</div>
						)}
						{url && <Paragraph TagName="div" mod="boldSmall" className="WorkItem__more">Узнать подробности</Paragraph>}
					</RenderComponent>
				</div>
			</div>
		);
	}
}

export default WorkItem;
