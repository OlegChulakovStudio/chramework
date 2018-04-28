import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Swiper from "react-id-swiper";

import TextGroup from "../../TextGroup/TextGroup.js";
import ArrowIcon from '../../../assets/arrow.svg';

import "./Slider.styl";

class Slider extends Component {

	static propTypes = {
		slides: PropTypes.any.isRequired,
		empty: PropTypes.bool,
		description: PropTypes.object
	};
	state = {
		indexActive: 0,
		transformFix: true
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
		const { slides, description, className, ...rest } = this.props;
		const countSlides = this.countSlides();
		const indexActive = this.state.indexActive;
		const sliderClass = classNames(['Slider', className]);
		const navStyle = classNames(['Slider__nav', {
			Slider__nav_empty: !description && !slides[0].description
		}]);
		const props = {
			slidesPerView: 1,
			grabCursor: true,
			loop: true,
			spaceBetween: 16,
			wrapperClass: "Slider__wrapper",
			on: {
				slideChange: () => {
					if (this.swiper) {
						this.setState({ indexActive: this.swiper.realIndex });
					}
				}
			}
		};

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
					<div className="Slider__navArea" onClick={this.slidePrev} />
					<div className="Slider__navArea" onClick={this.slideNext} />
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
					<div className={navStyle}>
						<div className="Slider__nav-btn Slider__nav-btn_prev" onClick={this.slidePrev}>
							<ArrowIcon />
						</div>
						<div className="Slider__pagination">
							<div className="Slider__pagination__item">
								{this.showIndex(indexActive)}
							</div>
							<span className="Slider__pagination-divider">/</span>
							<div className="Slider__pagination__item Slider__pagination__item--count">
								{countSlides < 10 ? `0${countSlides}` : countSlides}
							</div>
						</div>
						<div className="Slider__nav-btn Slider__nav-btn_next" onClick={this.slideNext}>
							<ArrowIcon />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Slider;
