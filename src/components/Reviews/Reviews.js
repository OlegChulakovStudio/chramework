import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Swiper from 'react-id-swiper';
import reactHtmlParser from 'react-html-parser';

import ArrowIcon from '../../assets/arrow.svg';
import DemoIcon from '../../assets/clients/megalabs.svg';
import Paragraph from '../Paragraph/Paragraph.js';

import 'react-id-swiper/src/styles/css/swiper.css';
import './Reviews.styl';

const exampleReviews = [
	{
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
		const { indexActive } = this.state;
		const currentReviews = reviews || exampleReviews;
		const countSlides = currentReviews.length;
		const classes = classNames(['Reviews', className]);
		const nextBtnClass = classNames([
			'Reviews__nav-btn',
			'Reviews__nav-btn_next',
			{
				'Reviews__nav-btn_disable': indexActive === currentReviews.length - 1
			}
		]);
		const props = {
			slidesPerView: 1,
			grabCursor: true,
			loop: true,
			spaceBetween: 16,
			wrapperClass: 'Reviews__container',
			on: {
				slideChange: () => {
					if (this.swiper) {
						this.setState({
							indexActive: this.swiper.realIndex
						});
					}
				}
			}
		};
		return (
			<div {...rest} className={classes}>
				<Swiper {...props} ref={this.getSwiperNode}>
					{currentReviews.map(client => {
						const Icon = client.icon ? client.icon : null;
						return (
							<div key={client.name} className="Reviews__item">
								<div className="Reviews__inner">
									<div className="Reviews__avatar">
										<img src={client.avatar} alt="img" />
									</div>
									<div className="Reviews__content">
										<Paragraph mod="subtitle" className="Reviews__text">
											«{reactHtmlParser(client.text)}»
										</Paragraph>
										<div className="Reviews__footer">
											<div className="Reviews__info">
												<Paragraph mod="boldMedium" className="Reviews__name">
													{reactHtmlParser(client.name)}
												</Paragraph>
												<Paragraph
													mod="bodySmall"
													className="Reviews__position">
													{reactHtmlParser(client.position)}
												</Paragraph>
											</div>
											{Icon &&
												<div className="Reviews__logo">
													<Icon />
												</div>
											}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</Swiper>
				<div className="Reviews__nav">
					<div
						className="Reviews__nav-btn Reviews__nav-btn_prev"
						onClick={this.slidePrev}>
						<ArrowIcon />
					</div>
					<div className="Reviews__pagination">
						<div className="Reviews__pagination__item">
							{indexActive + 1 < 10 ? `0${indexActive + 1}` : indexActive + 1}
						</div>
						<span className="Reviews__pagination-divider">/</span>
						<div className="Reviews__pagination__item Reviews__pagination__item--count">
							{countSlides < 10 ? `0${countSlides}` : countSlides}
						</div>
					</div>

					<div className={nextBtnClass} onClick={this.slideNext}>
						<ArrowIcon />
					</div>
				</div>
			</div>
		);
	}
}

export default Reviews;
