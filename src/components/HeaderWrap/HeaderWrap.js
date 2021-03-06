import React from 'react';

import Header from '../Header/Header';
// import showreel from "./showreel.gif";
// import pic1 from "./showreel_1.png";
// import pic2 from "./showreel_2.png";
// import pic3 from "./showreel_3.png";
// import pic4 from "./showreel_4.png";
import '../Header/styles.styl';

// const menu = [
//   {
//     name: "Компания",
//     url: "https://chulakov.ru/",
//     exact: true,
//     main: true,
//     external: true
//   },
//   {
//     name: "Проекты",
//     url: "https://chulakov.ru//work",
//     activeFunc: true,
//     external: true
//   },
//   {
//     name: "Работа у&nbsp;нас",
//     url: "https://chulakov.ru/career",
//     exact: true,
//     vacancies: true,
//     external: true
//   },
//   {
//     name: "Школа",
//     url: "https://school.chulakov.ru/",
//     hideInMenu: false,
//     external: true
//   },
//   {
//     name: "Контакты",
//     url: "https://chulakov.ru/contact",
//     exact: true,
//     main: true,
//     external: true
//   }
// ];

const navMenu = [
	{
		name: 'Главный',
		url: 'main'
	},
	{
		name: 'Программа курса',
		url: 'programm'
	},
	{
		name: 'Для кого курс',
		url: 'help'
	},
	{
		name: 'Отзывы',
		url: 'graduates'
	},
	{
		name: 'Контакты',
		url: 'contacts'
	}
];

// const videoPlay = {
//   text: "Showreel 2017",
//   link: {
//     href: "https://chulakov.ru/video/showreel-2017"
//   },
//   randomBg: [pic1, pic2, pic3, pic4],
//   gif: showreel
// };

// const phone = {
//   number: "+7(863)5164134",
//   inner: "+7 (863) - 516 - 41 - 34"
// };

const HeaderWrap = () => {
	return <Header hamburger scrollMenu={navMenu} />;
};

export default HeaderWrap;
