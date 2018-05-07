import React from 'react';
import MenuInner from '../MenuInner';
import './styles.styl';

const Home = props => (
	<div className="Menu" fullScreen>
		<div className="Menu__inner">
			<MenuInner vacanciesCount={props.vacanciesCount} />
		</div>
	</div>
);

export default Home;
