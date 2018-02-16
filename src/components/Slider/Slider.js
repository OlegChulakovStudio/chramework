import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Paragraph from "../Paragraph/Paragraph.js";
import reactHtmlParser from "react-html-parser";
import Swiper from "react-id-swiper";
import ArrowIcon from './icons/arrow.svg';
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

  render() {
    const countSlides = this.countSlides();
    const indexActive = this.state.indexActive;
    const { slides, description } = this.props;
    const sliderClass = classNames({
      Slider: true
    });
    const nextBtnClass = classNames({
      "Slider__nav-btn": true,
      "Slider__nav-btn_next": true
    });
    const prevBtnClass = classNames({
      "Slider__nav-btn": true,
      "Slider__nav-btn_prev": true
    });
    const descriptionStyle = classNames({
      Slider__content: true,
      "Slider__content--active": true
    });
    const countStyle = classNames({
      Slider__pagination__item: true,
      "Slider__pagination__item--count": true
    });
    const navStyle = classNames({
      Slider__nav: true,
      Slider__nav_empty: !description && !slides[0].description
    });
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
        <div className={sliderClass}>
          <div
            className="Slider__container"
            style={this.state.transformFix ? { transform: "none" } : {}}
          >
            <Swiper
              {...props}
              ref={node => {
                if (node) {
                  this.swiper = node.swiper;
                  this.swiper.autoplay.stop();
                }
              }}
            >
              {slides.map((slide, i) => {
                const key = `slide-${i}`;
                return (
                  <div className="Slider__item" key={key}>
                    <img className="Slider__img" src={slide.photo} alt="" />
                  </div>
                );
              })}
            </Swiper>
            <div
              className="Slider__navArea"
              onClick={() => this.swiper.slidePrev()}
            />
            <div
              className="Slider__navArea"
              onClick={() => this.swiper.slideNext()}
            />
          </div>

          <div className="Slider__bottom">
            {(description || slides[0].description) &&
              (
                <div className={descriptionStyle}>
                  <span className="Slider__label">
                    <Paragraph mod="boldSmall" >
                      {reactHtmlParser(description ? description.label : slides[indexActive].description.label)}
                    </Paragraph>
                  </span>
                  <span className="Slider__text">
                    <Paragraph mod="bodySmallItalic" >
                      {reactHtmlParser(description ? description.text : slides[indexActive].description.text)}
                    </Paragraph>
                  </span>
                </div>
              )
            }

            <div className={navStyle}>
              <div
                className={prevBtnClass}
                onClick={() => this.swiper.slidePrev()}
              >
                <ArrowIcon />
              </div>
              <div className="Slider__pagination">
                <div className="Slider__pagination__item">
                  {indexActive + 1 < 10
                    ? `0${indexActive + 1}`
                    : indexActive + 1}
                </div>
                <span className="Slider__pagination-divider">/</span>
                <div className={countStyle}>
                  {countSlides < 10 ? `0${countSlides}` : countSlides}
                </div>
              </div>
              <div
                className={nextBtnClass}
                onClick={() => this.swiper.slideNext()}
              >
                <ArrowIcon />
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Slider;
