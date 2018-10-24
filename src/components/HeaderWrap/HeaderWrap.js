
import React from 'react';

import Header from '../Header/Header';
import showreel from './showreel.gif';
import pic1 from './showreel_1.png';
import pic2 from './showreel_2.png';
import pic3 from './showreel_3.png';
import pic4 from './showreel_4.png';
import '../Header/styles.styl';



const menu = [{
	"name": "Компания",
	"url": "/",
	"exact": true,
	"main": true,
	"sublist": [{
		"name": "Услуги",
		"url": "/services",
		"inMobile": true
	},
	{
		"name": "Клиенты",
		"url": "/clients",
		"inMobile": true
	},
	{
		"name": "Награды",
		"url": "/awards",
		"inMobile": true
	},
	{
		"name": "События",
		"url": "/life",
		"inMobile": true
	},
	{
		"name": "Студия в СМИ",
		"url": "/press",
		"inMobile": true
	}
	]
},
{
	"name": "Проекты",
	"url": "/work",
	"activeFunc": true,
	"sublist": [{
		"name": "Системы и&nbsp;сервисы",
		"url": "/work/service"
	},
	{
		"name": "Mobile",
		"url": "/work/app"
	},
	{
		"name": "Посмотреть все",
		"url": "/work"
	}
	]
},
{
	"name": "Работа у&nbsp;нас",
	"url": "/career",
	"exact": true,
	"vacancies": true,
	"sublist": [{
		"name": "О&nbsp;работе в&nbsp;Студии",
		"url": "/career"
	},
	{
		"name": "Вакансии",
		"url": "/career/#vacancies",
		"vacancies": true

	},
	{
		"name": "Корпоративная культура",
		"url": "/corporate-culture"
	}
	]
},
{
	"name": "Контакты",
	"url": "/contact",
	"exact": true,
	"main": true,
	"sublist": [{
		"name": "+7 495 268-06-61",
		"tel": "+74952680661",
		"inMobile": true,
		"icon": "moscow"
	},
	{
		"name": "+7 863 303-61-91",
		"tel": "+78633036191",
		"inMobile": true,
		"icon": "rostov"
	},
	{
		"name": "hello@chulakov.ru",
		"mailto": "hello@chulakov.ru",
		"inMobile": true
	}
	]
}
];

const videoPlay = {
	text: 'Showreel 2017',
	link: {
		href: 'https://chulakov.ru/video/showreel-2017'
	},
	randomBg: [
		pic1,
		pic2,
		pic3,
		pic4,
	],
	gif: showreel,
}




const HeaderWrap = () => {
	return (
		<Header
			vacanciesCount={8}
			redirectUrl={''}
			menu={menu}
			videoPlay={videoPlay}
			mod="workItem"
		/>
	);
}

export default HeaderWrap;
