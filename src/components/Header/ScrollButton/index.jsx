import React from "react";
import PropTypes from "prop-types";
import LinkScroll from "../../LinkScroll";
import Icon from "../../../assets/payment.svg";
import "./styles.styl";

const ScrollButton = ({ data }) => {
  return (
    <LinkScroll
      offsetTop={data.offsetTop}
      className="ScrollButton"
      to={data.url}
      duration={550}
      ease="easeInOutQuint"
    >
      <div className="ScrollButton__link">
        <div className="ScrollButton__icon">
          <Icon />
        </div>
        <div className="ScrollButton__text">{data.text}</div>
      </div>
    </LinkScroll>
  );
};

ScrollButton.propTypes = {
  data: PropTypes.object
};

export default ScrollButton;
