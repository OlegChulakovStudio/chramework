import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Note from '../../Note/Note';
import Link from '../../Link/Link';

import './FooterMini.styl';

const FooterMini = ({ data, offset, mod }) => {
	const blockStyle = classNames("FooterMini", {
		"FooterMini_offset": offset,
		[`FooterMini_${mod}`]: mod,
	});
	return (
		<div className={blockStyle}>
			<div className={"FooterMini__inner"}>
				<Note
					className={classNames("FooterMini__item", "FooterMini__item_note")}
					text={data.note}
				/>
				<Link
					className={classNames("FooterMini__item", "FooterMini__item_phone")}
					disableBlank
					href={`tel:${data.phone.number}`}>
					{data.phone.content}
				</Link>
				<Link className={"FooterMini__item"} disableBlank href={`mailto:${data.email}`}>
					{data.email}
				</Link>
			</div>
		</div>
	);
};

FooterMini.propTypes = {
	data: PropTypes.object,
	offset: PropTypes.bool,
	mod: PropTypes.string,
};

export default FooterMini;
