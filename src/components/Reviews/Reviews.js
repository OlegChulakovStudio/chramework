import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Swiper from 'react-id-swiper';
import reactHtmlParser from 'react-html-parser';

// import ArrowIcon from '../../assets/arrow.svg';
import DemoIcon from '../../assets/clients/rosbank.svg';
import Paragraph from '../Paragraph/Paragraph.js';

import 'react-id-swiper/src/styles/css/swiper.css';
import './Reviews.styl';

const exampleReviews = [
	{	icon: DemoIcon,
		avatar: 'https://chulakov.ru/work/megalabs/images/avatar.jpg',
		name: 'Ян Кухальский',
		position: 'Генеральный Директор MegaLabs',
		text:
			'Хотелось&nbsp;бы отметить глубокую аналитическую работу, которая проводится перед выполнением каждой задачи. Это позволяет оптимизировать рабочий процесс и&nbsp;добиться высокого качества готового продукта. Рекомендуем Студию Олега Чулакова как надежного партнера в&nbsp;разработке веб-сайтов и&nbsp;сложных сервисных систем'
	},
	{
		icon: DemoIcon,
		avatar: 'https://chulakov.ru/work/bcs/images/avatar.jpg',
		name: 'Дмитрий Костенко',
		position: 'Директор департамента развития корпоративного бизнеса БКС',
		text:
			'Студия Олега Чулакова разрабатывает для АО&nbsp;&#8222;БКС&nbsp;Банк&#8221; онлайн-сервис Личный кабинет для малого бизнеса. За&nbsp;время сотрудничества компания зарекомендовала себя как эксперт в&nbsp;области разработки сложных сервисов и&nbsp;интегрированных систем'
	},
	{	icon: DemoIcon,
		avatar: 'https://chulakov.ru/work/megalabs/images/avatar.jpg',
		name: 'Ян Кухальский',
		position: 'Генеральный Директор MegaLabs',
		text:
			'Хотелось&nbsp;бы отметить глубокую аналитическую работу, которая проводится перед выполнением каждой задачи. Это позволяет оптимизировать рабочий процесс и&nbsp;добиться высокого качества готового продукта. Рекомендуем Студию Олега Чулакова как надежного партнера в&nbsp;разработке веб-сайтов и&nbsp;сложных сервисных систем'
	},
	{
		icon: DemoIcon,
		avatar: 'https://chulakov.ru/work/bcs/images/avatar.jpg',
		name: 'Дмитрий Костенко',
		position: 'Директор департамента развития корпоративного бизнеса БКС',
		text:
			'Студия Олега Чулакова разрабатывает для АО&nbsp;&#8222;БКС&nbsp;Банк&#8221; онлайн-сервис Личный кабинет для малого бизнеса. За&nbsp;время сотрудничества компания зарекомендовала себя как эксперт в&nbsp;области разработки сложных сервисов и&nbsp;интегрированных систем'
	},
	{	icon: DemoIcon,
		avatar: 'https://chulakov.ru/work/megalabs/images/avatar.jpg',
		name: 'Ян Кухальский',
		position: 'Генеральный Директор MegaLabs',
		text:
			'Хотелось&nbsp;бы отметить глубокую аналитическую работу, которая проводится перед выполнением каждой задачи. Это позволяет оптимизировать рабочий процесс и&nbsp;добиться высокого качества готового продукта. Рекомендуем Студию Олега Чулакова как надежного партнера в&nbsp;разработке веб-сайтов и&nbsp;сложных сервисных систем'
	},
	{
		icon: DemoIcon,
		avatar: 'https://chulakov.ru/work/bcs/images/avatar.jpg',
		name: 'Дмитрий Костенко',
		position: 'Директор департамента развития корпоративного бизнеса БКС',
		text:
			'Студия Олега Чулакова разрабатывает для АО&nbsp;&#8222;БКС&nbsp;Банк&#8221; онлайн-сервис Личный кабинет для малого бизнеса. За&nbsp;время сотрудничества компания зарекомендовала себя как эксперт в&nbsp;области разработки сложных сервисов и&nbsp;интегрированных систем'
	},
	{	icon: DemoIcon,
		avatar: 'https://chulakov.ru/work/megalabs/images/avatar.jpg',
		name: 'Ян Кухальский',
		position: 'Генеральный Директор MegaLabs',
		text:
			'Хотелось&nbsp;бы отметить глубокую аналитическую работу, которая проводится перед выполнением каждой задачи. Это позволяет оптимизировать рабочий процесс и&nbsp;добиться высокого качества готового продукта. Рекомендуем Студию Олега Чулакова как надежного партнера в&nbsp;разработке веб-сайтов и&nbsp;сложных сервисных систем'
	},
	{
		icon: DemoIcon,
		avatar: 'https://chulakov.ru/work/bcs/images/avatar.jpg',
		name: 'Дмитрий Костенко',
		position: 'Директор департамента развития корпоративного бизнеса БКС',
		text:
			'Студия Олега Чулакова разрабатывает для АО&nbsp;&#8222;БКС&nbsp;Банк&#8221; онлайн-сервис Личный кабинет для малого бизнеса. За&nbsp;время сотрудничества компания зарекомендовала себя как эксперт в&nbsp;области разработки сложных сервисов и&nbsp;интегрированных систем'
	},
	{	icon: DemoIcon,
		avatar: 'https://chulakov.ru/work/megalabs/images/avatar.jpg',
		name: 'Ян Кухальский',
		position: 'Генеральный Директор MegaLabs',
		text:
			'Хотелось&nbsp;бы отметить глубокую аналитическую работу, которая проводится перед выполнением каждой задачи. Это позволяет оптимизировать рабочий процесс и&nbsp;добиться высокого качества готового продукта. Рекомендуем Студию Олега Чулакова как надежного партнера в&nbsp;разработке веб-сайтов и&nbsp;сложных сервисных систем'
	},
	{
		icon: DemoIcon,
		avatar: 'https://chulakov.ru/work/bcs/images/avatar.jpg',
		name: 'Дмитрий Костенко',
		position: 'Директор департамента развития корпоративного бизнеса БКС',
		text:
			'Студия Олега Чулакова разрабатывает для АО&nbsp;&#8222;БКС&nbsp;Банк&#8221; онлайн-сервис Личный кабинет для малого бизнеса. За&nbsp;время сотрудничества компания зарекомендовала себя как эксперт в&nbsp;области разработки сложных сервисов и&nbsp;интегрированных систем'
	}
];

class Reviews extends Component {

	static propTypes = {
		className: PropTypes.string,
		reviews: PropTypes.array
	};

	static defaultProps = {
		className: undefined,
		reviews: undefined
	};

	state = { indexActive: 0 };

	getSwiperNode = node => {
		if (node) {
			this.swiper = node.swiper;
		}
	};

	slidePrev = () => this.swiper.slidePrev();

	slideNext = () => this.swiper.slideNext();

	render() {

		const { className, reviews, ...rest } = this.props;
		const currentReviews = reviews || exampleReviews;
		const classes = classNames(['Reviews', className]);
		const isDynamicBullets = currentReviews.length > 4;
		const props = {
			slidesPerView: 1,
			grabCursor: true,
			spaceBetween: 16,
			wrapperClass: 'Reviews__container',
			pagination: {
				el: '.Reviews__pagination',
				clickable: true,
				dynamicBullets: isDynamicBullets,
				dynamicMainBullets: 3
			},
			on: {
				slideChange: () => {
					if (this.swiper) {
						this.setState({
							indexActive: this.swiper.realIndex
						});
					}
				}
			},
		};

		return (
			<div {...rest} className={classes}>
				<Swiper {...props} ref={this.getSwiperNode}>
					{currentReviews.map(client => {
						const Icon = client.icon ? client.icon : null;
						return (
							<div key={client.name} className="Reviews__item">
								<div className="Reviews__inner">
									<div className="Reviews__top">
										<div className="Reviews__info">
											<div className="Reviews__avatar">
												<img src={client.avatar} alt="img" />
											</div>
											<div className="Reviews__info-text">
												<Paragraph mod="boldMedium" className="Reviews__name">
													{reactHtmlParser(client.name)}
												</Paragraph>
												<Paragraph
													mod="bodySmall"
													className="Reviews__position">
													{reactHtmlParser(client.position)}
												</Paragraph>
											</div>
										</div>
										{Icon &&
											<div className="Reviews__logo">
												<Icon />
											</div>
										}
									</div>
									
									<div className="Reviews__content">
										<Paragraph mod="subtitle" className="Reviews__text">
											«{reactHtmlParser(client.text)}»
										</Paragraph>
									</div>
								</div>
							</div>
						);
					})}
				</Swiper>
			</div>
		);
	}
}

export default Reviews;
