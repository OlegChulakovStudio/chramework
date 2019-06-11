import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Swiper from "react-id-swiper";

import TextGroup from "../TextGroup/TextGroup.js";
import ArrowIcon from '../../assets/arrow.svg';

import "./Slider.styl";

class Slider extends Component {

	static propTypes = {
		slides: PropTypes.any.isRequired,
		empty: PropTypes.bool,
		description: PropTypes.object,
		noLoop: PropTypes.bool,
	};
	state = {
		indexActive: 0,
		transformFix: true,
		hideArrows: false
	};
	componentDidMount() {
		setTimeout(() => {
			this.setState({ transformFix: false });
		}, 100);
	}
	countSlides = () => {
		const slides = [];
		let currentLength;
		this.props.slides.forEach(element => {
			slides.push(element);
			currentLength = slides.length;
		});
		return currentLength;
	};

	slideNext = () => this.swiper.slideNext();
	slidePrev = () => this.swiper.slidePrev();
	getSwiperNode = node => {
		if (node) {
			this.swiper = node.swiper;
			this.swiper.autoplay.stop();
		}
	}
	showIndex = (indexActive) => {
		return indexActive + 1 < 10 ? `0${indexActive + 1}` : indexActive + 1;
	}

	render() {
		const { slides, description, className, noLoop, ...rest } = this.props;
		const countSlides = this.countSlides();
		const indexActive = this.state.indexActive;
		const sliderClass = classNames(['Slider', className]);
		const navStyle = classNames(['Slider__nav', {
			Slider__nav_empty: !description && !slides[0].description
		}]);
		const isDynamicBullets = slides.length > 4;
		const props = {
			slidesPerView: 1,
			grabCursor: true,
			loop: !noLoop,
			spaceBetween: 16,
			wrapperClass: "Slider__wrapper",
			pagination: {
				el: '.Slider__pagination',
				clickable: true,
				dynamicBullets: isDynamicBullets,
				dynamicMainBullets: 3
			},
			on: {
				slideChange: () => {
					if (this.swiper) {
						this.setState({ indexActive: this.swiper.realIndex, hideArrows: true });
					}
				}
			}
		};
		const firstSlide = indexActive === 0;
		const lastSlide = this.props.slides.length - 1 === indexActive;
		const arrowPrevStyle = classNames('Slider__navArea Slider__navArea_prev', {
			'Slider__navArea_hide': this.state.hideArrows
		});
		const arrowNextStyle = classNames('Slider__navArea Slider__navArea_next', {
			'Slider__navArea_hide': this.state.hideArrows
		});
		return (
			<div {...rest} className={sliderClass}>
				<div
					className="Slider__container"
					style={this.state.transformFix ? { transform: "none" } : {}}
				>
					<Swiper {...props} ref={this.getSwiperNode}>
						{slides.map((slide, i) => {
							const key = `slide-${i}`;
							return (
								<div className="Slider__item" key={key}>
									<img className="Slider__img" src={slide.photo} alt="" />
								</div>
							);
						})}
					</Swiper>
					{!firstSlide && <div className={arrowPrevStyle} onClick={this.slidePrev} ><ArrowIcon className="Slider__navArea-icon Slider__navArea-icon_left" /></div>}
					{!lastSlide && <div className={arrowNextStyle} onClick={this.slideNext} ><ArrowIcon className="Slider__navArea-icon Slider__navArea-icon_right" /></div>}
				</div>
				<div className="Slider__bottom">
					{(description || slides[0].description) &&
						(
							<div className="Slider__content Slider__content--active">
								<TextGroup
									title={description ? description.label : slides[indexActive].description.label}
									subtitle={description ? description.text : slides[indexActive].description.text}
									mod="boldTitle"
								/>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}

export default Slider;
