import React from 'react';
import './Copyright.styl';

const Copyright = props => (
	<div className="Copyright">
		<span className="Copyright__symbol">&copy;</span>&nbsp;{props.text || "Студия Олега Чулакова"}
	</div>
);

export default Copyright;
