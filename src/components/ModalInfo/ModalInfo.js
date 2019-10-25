import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './styles.styl';

const ModalInfo = ({ title, text, button }) => {
	return (
		<div className="ModalInfo">
			{(title || text) && (
				<div className="ModalInfo__heading">
					{title && (
						<h2
							className="ModalInfo__title"
							level={2}
							dangerouslySetInnerHTML={{
								__html: `${title}`
							}}
						/>
					)}
					{text && (
						<div className="ModalInfo__text">
							{typeof text === 'object' ? (
								text.map((item, i) => {
									const key = `text-${i}`;
									return (
										<p
											key={key}
											className="ModalInfo__text-item"
											dangerouslySetInnerHTML={{
												__html: `${item}`
											}}
										/>
									);
								})
							) : (
								<p
									className="ModalInfo__text-item"
									dangerouslySetInnerHTML={{
										__html: `${text}`
									}}
								/>
							)}
						</div>
					)}
				</div>
			)}
			{button && <Button className="ModalInfo__button" {...button} />}
		</div>
	);
};

ModalInfo.propTypes = {
	title: PropTypes.string,
	text: PropTypes.any,
	button: PropTypes.object
};

export default ModalInfo;
