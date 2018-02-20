import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paragraph from "../Paragraph/Paragraph.js";
import reactHtmlParser from "react-html-parser";
import './TextGroup.styl';

export default class TextGroup extends Component {
	static propTypes = {
		title: PropTypes.string,
		subtitle: PropTypes.string,
		text: PropTypes.string,
		className: PropTypes.string,
		mod: PropTypes.string,
		children: PropTypes.any,
	}
	static defaultProps = {
		title: '',
		subtitle: '',
		text: '',
		mod: ''
	}
	render() {
		const {
			mod,
			className,
			children,
			title,
			subtitle,
			text,
		} = this.props;

		const TextGroupStyle = classNames('TextGroup', className, {
			[`TextGroup_${mod}`]: mod,
		});
		const titleMod = mod === "boldTitle" ? "boldMedium" : "bodySmallGray";
		const subtitleMod = mod === "boldTitle" ? "bodySmallGrayItalic" : "subtitle";
		return (
			<div className={TextGroupStyle}>
				{title && <Paragraph mod={titleMod} className="TextGroup__title">
					{reactHtmlParser(title)}
				</Paragraph>}
				{subtitle && <Paragraph mod={subtitleMod} className="TextGroup__subtitle">
					{reactHtmlParser(subtitle)}
				</Paragraph>}
				{text && <Paragraph mod="body" className="TextGroup__text">{reactHtmlParser(text)}</Paragraph>}
				{children && children}
			</div>
			);
	}
}