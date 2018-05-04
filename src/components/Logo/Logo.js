import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reactHtmlParser from "react-html-parser";

import Link from '../Link/Link';
import LogoIcon from './assets/logo.svg';

import './Logo.styl';

export default class Logo extends Component {

	static propTypes = {
		/** Avaliable values: ['small',''] */
		size: PropTypes.string,
		/** Avaliable values: ['light',''] */
		mod: PropTypes.string,
		/** Avaliable values: ['black',''] */
		type: PropTypes.string,

		linkProps: PropTypes.object,
		/** set this param to true, if you want to add text after logo */
		text: PropTypes.string,
		/** set this param to true, if you want to add text after logo */
		ingroup: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.bool
		]),
		madeinlab: PropTypes.bool,
	};

	static defaultProps = {
		size: undefined,
		mod: undefined,
		type: undefined,
		text: undefined,
		ingroup: undefined,
		linkProps: undefined,
		madeinlab: undefined,
	};

	render() {
		const { linkProps, mod, size, type, className, text, madeinlab, ingroup, ...rest } = this.props;
		const currentGroupText = typeof ingroup === 'object' ? ingroup.text : 'Chulakov Group';
		const currentGroupLink = typeof ingroup === 'object' ? ingroup.url : 'https://group.chulakov.ru/';
		return (
			<div {...rest} className={classNames([
				'Logo',
				className,
				{
					[`Logo--${size}`]: size,
					[`Logo--${type}`]: type,
					[`Logo--${mod}`]: mod,
					[`Logo--ingroup`]: ingroup || madeinlab,
				}
			])}>
				<LogoIcon className="Logo__icon" width={120} height={28} />
				{text && <span className="Logo__sufix">{text}</span>}
				{linkProps && <Link {...linkProps} disableBlank className="Logo__link" />}
				{(ingroup || madeinlab) && <span className="Logo__ingroup">
					{ingroup && reactHtmlParser(`в составе <a href="${currentGroupLink}" target="_blank">${currentGroupText}</a>`)}
					{madeinlab && reactHtmlParser("сделано в <a href=\"https://lab.chulakov.ru\" target=\"_blank\">Chulakov Lab</a>")}
				</span>}
			</div>
		);
	}
}
