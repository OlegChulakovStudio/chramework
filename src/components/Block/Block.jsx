import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reactHtmlParser from 'react-html-parser';

import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';

import './Block.styl';

const Block = ({
	children,
	title,
	subtitle,
	level,
	mod,
	headerLevel,
	noMargin,
	className,
	background,
	outside,
}) => {
	const pageStyle = classNames({
		Block: true,
		[`Block_${mod}`]: mod,
		[`block${level}`]: level && !headerLevel && !outside,
		[`block${headerLevel}__header`]: headerLevel,
		[`block1__bg`]: background,
		[`block1__noMargin`]: noMargin,
		[`${className}`]: className,
	});
	const pageInnerStyle = classNames({
		Block__inner: true,
		[`${className}`]: className,
		[`block${level}`]: level,
	});
	const headerStyle = classNames({
		[`block${level}__header`]: level,
	});
	return outside ? (
		<div className={pageStyle}>
			<div className={pageInnerStyle}>
				{(title || subtitle) && (
					<div className={headerStyle}>
						{title && <Heading level={level || 2}>{reactHtmlParser(title)}</Heading>}
						{subtitle &&
							(typeof subtitle === 'object' ? (
								subtitle.map((item, i) => {
									const key = `subtitle-${i}`;
									return (
										<Paragraph key={key} mod="body">
											{reactHtmlParser(item)}
										</Paragraph>
									);
								})
							) : (
								<Paragraph mod="body">{reactHtmlParser(subtitle)}</Paragraph>
							))}
					</div>
				)}
				{children}
			</div>
		</div>
	) : (
		<div className={pageStyle}>
			{(title || subtitle) && (
				<div className={headerStyle}>
					{title && <Heading level={level || 2}>{reactHtmlParser(title)}</Heading>}
					{subtitle &&
						(typeof subtitle === 'object' ? (
							subtitle.map((item, i) => {
								const key = `subtitle-${i}`;
								return (
									<Paragraph key={key} mod="body">
										{reactHtmlParser(item)}
									</Paragraph>
								);
							})
						) : (
							<Paragraph mod="body">{reactHtmlParser(subtitle)}</Paragraph>
						))}
				</div>
			)}
			{children}
		</div>
	);
};

Block.defaultProps = {
	title: undefined,
	mod: undefined,
	subtitle: undefined,
	headerLevel: undefined,
	className: undefined,
	level: 2,
	background: false,
	noMargin: false,
	outside: false,
};

Block.propTypes = {
	children: PropTypes.node,
	mod: PropTypes.any,
	title: PropTypes.any,
	background: PropTypes.bool,
	noMargin: PropTypes.bool,
	className: PropTypes.string,
	level: PropTypes.number,
	subtitle: PropTypes.any,
	headerLevel: PropTypes.number,
	outside: PropTypes.bool,
};

export default Block;
