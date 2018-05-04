import React from 'react';
import Screen from 'components/Screen';
import MenuInner from '../MenuInner';
import './styles.styl';

const Home = props => (
	<Screen className="Menu" fullScreen>
		<div className="Menu__inner">
			<MenuInner vacanciesCount={props.vacanciesCount} />
		</div>
	</Screen>
);

export default Home;
