import React from "react";

import Header from "../Header/Header";
// import showreel from "./showreel.gif";
// import pic1 from "./showreel_1.png";
// import pic2 from "./showreel_2.png";
// import pic3 from "./showreel_3.png";
// import pic4 from "./showreel_4.png";
import "../Header/styles.styl";

const menu = [
  {
    name: "Для кого",
    url: "forwhom"
  },
  {
    name: "Программа курса",
    url: "programm"
  },
  {
    name: "Подробности",
    url: "details"
  },
  {
    name: "Выпускники",
    url: "graduates"
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

const HeaderWrap = () => {
  return (
    <Header
      redirectUrl={""}
      scrollMenu={menu}
      linkScroll={{ url: "brief", text: "Подать заявку" }}
    />
  );
};

export default HeaderWrap;
