import React, { Component } from "react";
import PropTypes from "prop-types";
import Subtitle from "../Subtitle/Subtitle.js";
import "react-id-swiper/src/styles/css/swiper.css";
import Swiper from "react-id-swiper";
import classNames from "classnames";
import ArrowIcon from "./icons/arrow.svg";
import Icon from "./icons/megalabs.svg";
import reactHtmlParser from "react-html-parser";
import "./Reviews.styl";

const exampleReviews = [
  {
    icon: Icon,
    avatar: "https://chulakov.ru/work/megalabs/images/avatar.jpg",
    name: "Ян Кухальский",
    position: "Генеральный Директор MegaLabs",
    text:
      "Хотелось&nbsp;бы отметить глубокую аналитическую работу, которая проводится перед выполнением каждой задачи. Это позволяет оптимизировать рабочий процесс и&nbsp;добиться высокого качества готового продукта. Рекомендуем Студию Олега Чулакова как надежного партнера в&nbsp;разработке веб-сайтов и&nbsp;сложных сервисных систем"
  },
  {
    icon: Icon,
    avatar: "https://chulakov.ru/work/bcs/images/avatar.jpg",
    name: "Дмитрий Костенко",
    position: "Директор департамента развития корпоративного бизнеса БКС",
    text:
      "Студия Олега Чулакова разрабатывает для АО&nbsp;&#8222;БКС&nbsp;Банк&#8221; онлайн-сервис Личный кабинет для малого бизнеса. За&nbsp;время сотрудничества компания зарекомендовала себя как эксперт в&nbsp;области разработки сложных сервисов и&nbsp;интегрированных систем"
  }
];

class Reviews extends Component {
  static propTypes = {
    className: PropTypes.string,
    reviews: PropTypes.array.string
  };
  static defaultProps = {
    className: "",
    reviews: undefined
  };
  state = {
    indexActive: 0
  };
  render() {
    const { className, reviews } = this.props;
    const indexActive = this.state.indexActive;
    const currentReviews = reviews || exampleReviews;
    const countSlides = currentReviews.length;
    const classes = classNames({
      Reviews: true,
      [className]: className
    });
    const countStyle = classNames({
      Reviews__pagination__item: true
    });
    const nextBtnClass = classNames({
      "Reviews__nav-btn": true,
      "Reviews__nav-btn_next": true,
      "Reviews__nav-btn_disable": indexActive === currentReviews.length - 1
    });
    const prevBtnClass = classNames({
      "Reviews__nav-btn": true,
      "Reviews__nav-btn_prev": true
    });
    const props = {
      slidesPerView: 1,
      grabCursor: true,
      loop: true,
      spaceBetween: 16,
      wrapperClass: "Reviews__container",
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
      <div className={classes}>
        <Swiper
          {...props}
          ref={node => {
            if (node) {
              this.swiper = node.swiper;
            }
          }}
        >
          {currentReviews.map(client => {
            return (
              <div key={client.name} className="Reviews__item">
                <div key={client.name} className="Reviews__inner">
                  <div className="Reviews__avatar">
                    <img src={client.avatar} alt="img" />
                  </div>
                  <div className="Reviews__content">
                    <div className="Reviews__text">
                      <Subtitle>«{reactHtmlParser(client.text)}»</Subtitle>
                    </div>
                    <div className="Reviews__footer">
                      <div className="Reviews__info">
                        <div className="Reviews__name">
                          {reactHtmlParser(client.name)}
                        </div>
                        <div className="Reviews__position">
                          {reactHtmlParser(client.position)}
                        </div>
                      </div>
                      <div className="Reviews__logo">
                        <Icon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Swiper>
        <div className="Reviews__nav">
          <div className={prevBtnClass} onClick={() => this.swiper.slidePrev()}>
            <ArrowIcon />
          </div>
          <div className="Reviews__pagination">
            <div className="Reviews__pagination__item">
              {indexActive + 1 < 10 ? `0${indexActive + 1}` : indexActive + 1}
            </div>
            <span className="Reviews__pagination-divider">/</span>
            <div className={countStyle}>
              {countSlides < 10 ? `0${countSlides}` : countSlides}
            </div>
          </div>

          <div className={nextBtnClass} onClick={() => this.swiper.slideNext()}>
            <ArrowIcon />
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
