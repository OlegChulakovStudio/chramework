import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import get from "lodash/get";
import { getBodyScrollTop } from "../../utils/scrollLock";
import { isPhone } from "../../utils/devices";
import LinkScroll from "../LinkScroll";
import Logo from "../Logo/Logo";
import Link from "../Link/Link";
import Navigation from "./Navigation";
import ScrollButton from "./ScrollButton";
import VideoPlay from "./VideoPlay";
import Hamburger from "./Hamburger";
import ModalMenuContainer from "./ModalMenuContainer";
import { actions as uiActions } from "../modules/ui.js";
import "./styles.styl";

const mapStateToProps = (state, ownProps) => ({
  ...state.ui,
  modalIsOpened: state.modal.modalIsOpened,
  pathname: get(state.router, "location.pathname", ""),
  menuIsOpened: state.ui.menuIsOpened,
  ...ownProps
});
const mapDispatchToProps = dispatch => ({
  menuOpen: () => dispatch(uiActions.menuOpen()),
  menuClose: () => dispatch(uiActions.menuClose())
});

class Header extends Component {
  static direction = "FORWARD";

  constructor(props) {
    super(props);
    this.state = {
      localMod: ""
    };
  }
  componentDidMount() {
    if (this.props.menu || (this.props.pinned === "desktop" && isPhone())) {
      this.scroll = 0;
      this.top = 0;
      this.scrollTop = getBodyScrollTop();
      document.addEventListener("scroll", this.toggleHeader, false);
      document.addEventListener("touchmove", this.toggleHeader, false);
      this.headerHeight = this.block.getBoundingClientRect().height;
      this.checkLocalMod(this.scrollTop);
    }
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.pathname !== prevProps.pathname ||
      this.props.modalIsOpened !== prevProps.modalIsOpened
    ) {
      this.top = 0;
      this.block.style.top = `${this.top}px`;
    }
    if (this.props.pathname !== prevProps.pathname) {
      this.setState({ localMod: "transitionLock" }, () => {
        setTimeout(() => {
          if (this.state.localMod === "transitionLock") {
            this.setState({ localMod: "" });
          }
        }, 100);
      });
    }
  };

  toggleHeader = () => {
    const currScrollTop = getBodyScrollTop();

    if (currScrollTop > this.scrollTop) {
      this.direction = "FORWARD";
    } else {
      this.direction = "REVERSE";
    }
    this.scrollAction(currScrollTop);
    this.scrollTop = currScrollTop;
  };

  onClick = () => {
    const {
      menuIsOpened,
      menuOpen,
      menuClose,
      redirectUrl,
      onHamburgerClick
    } = this.props;

    if (redirectUrl) {
      onHamburgerClick(redirectUrl);
    } else if (!menuIsOpened) {
      menuOpen();
    } else {
      menuClose();
    }
  };

  toogleMenu = () => {
    const { menuIsOpened, menuOpen, menuClose } = this.props;

    if (!menuIsOpened) {
      menuOpen();
    } else {
      menuClose();
    }
  };

  menuClose = () => {
    if (this.props.menuIsOpened) {
      this.props.menuClose();
    }
  };

  scrollAction = scroll => {
    const delta = this.scroll - scroll;
    if (window.lockScrollEvents) {
      return;
    }
    if (
      (scroll > 0 &&
        this.direction === "FORWARD" &&
        this.top >= -this.headerHeight) ||
      (scroll > 0 && this.direction === "REVERSE" && this.top <= 0)
    ) {
      let top = this.top + delta;
      if (top > 0) {
        top = 0;
      }
      if (top < -this.headerHeight) {
        top = -this.headerHeight;
      }
      this.top = top;
      if (this.block) {
        this.block.style.top = `${top}px`;
      }
    }
    if (scroll < this.headerHeight) {
      this.top = 0;
      if (this.block) {
        this.block.style.top = `${0}px`;
      }
    }
    this.scroll = scroll;

    this.checkLocalMod(scroll);
  };

  checkLocalMod = scroll => {
    if (this.props.mod === "work") {
      if (this.direction === "FORWARD") {
        const sectorFullScreen = document.getElementsByClassName(
          "Sector_fullScreen"
        )[0];
        if (sectorFullScreen && scroll >= sectorFullScreen.clientHeight) {
          if (this.state.localMod !== "light") {
            this.setState({ localMod: "light" });
          }
        }
      } else if (scroll <= 0) {
        this.setState({ localMod: "" });
      }
    }
    if (scroll >= this.headerHeight) {
      if (this.state.scrollMod !== "small") {
        this.setState({ scrollMod: "small" });
      }
    } else if (this.state.scrollMod === "small") {
      this.setState({ scrollMod: "" });
    }
  };

  getHeaderNode = el => {
    this.block = el;
  };
  renderLink = () => {
    const { linkProps } = this.props;
    const El = linkProps.scroll ? LinkScroll : Link;
    const props = linkProps.scroll
      ? {
        className: "Link Link_bold",
        to: linkProps.to,
        offsetTop: 80
      }
      : {
        bold: true,
        disableBlank: true,
        [linkProps.to ? "to" : "href"]: linkProps.to || linkProps.href
      };
    return <El {...props}>{linkProps.text}</El>;
  };

  render() {
    const {
      logoLink,
      menuIsOpened,
      page,
      modalIsOpened,
      scrollSize,
      redirectUrl,
      ingroup,
      text,
      withoutMenu,
      linkProps,
      scrollPanelOnPage,
      madeinlab,
      mod,
      longNav,
      mark,
      videoPlay,
      coronavirus,
    } = this.props;
    const { localMod, scrollMod } = this.state;
    const headerMark =
      mark && typeof mark === "object"
        ? mark.map(item => `Header_${item}`)
        : mark
          ? `Header_${mark}`
          : "";

    const styles = classNames("Header", headerMark, {
      Header_pinned:
        this.props.menu || this.props.scrollMenu || this.props.mobileMenu,
      Header_isLink: this.props.pinned === "desktop",
      Header_linkScroll: this.props.linkScroll,
      [`Header_${page}`]: page,
      [`Header_${mod}`]: mod,
      [`Header_${localMod}`]: localMod,
      [`Header_${scrollMod}`]: scrollMod,
      Header_topWork: page === "workItem" && localMod !== "light",
      Header_lab: page === "lab",
      Header_fix: menuIsOpened,
      Header_ingroup: ingroup || madeinlab,
      Header_longNav: longNav,
      Header_videoPlay: videoPlay,
      Header_coronavirus: coronavirus
    });
    const logoMod =
      mod === "dark" || mod === "white" ? "light" : "";

    const link = logoLink ? { href: logoLink } : { to: "/" }
    const logoLinkProp = page ? link : undefined

    return (
      <header
        className={styles}
        style={{
          right: `${modalIsOpened && scrollPanelOnPage ? scrollSize : 0}px`
        }}
        ref={this.getHeaderNode}
      >
        <div className="Header__inner">
          <div className="Header__logo">
            <Logo
              linkProps={logoLinkProp}
              mod={logoMod}
              mark={mark}
              onClick={this.menuClose}
              ingroup={ingroup}
              madeinlab={madeinlab}
              text={text}
              isBlue={mod === "white"}
              menuIsOpened={menuIsOpened}
              coronavirus={coronavirus}
            />
          </div>
          {(this.props.menu || this.props.scrollMenu) && !withoutMenu && (
            <div className="Header__content">
              <div className="Header__content-inner">
                <Navigation
                  filterList={this.props.filterList}
                  vacanciesCount={this.props.vacanciesCount}
                  menu={this.props.menu}
                  scrollMenu={this.props.scrollMenu}
                />
                {this.props.videoPlay && (
                  <VideoPlay data={this.props.videoPlay} />
                )}
                {this.props.phone && (
                  <Link
                    href={`tel:${this.props.phone.number}`}
                    className="Header__phone"
                    disableBlank
                    bold
                  >
                    {this.props.phone.inner}
                  </Link>
                )}
                {this.props.linkScroll && (
                  <ScrollButton data={this.props.linkScroll} />
                )}
              </div>
            </div>
          )}
          {this.props.menu && (
            <Hamburger
              mod={mod}
              menuIsOpened={menuIsOpened || redirectUrl.length > 0}
              onClick={this.onClick}
            />
          )}
          {linkProps && !this.props.menu && this.renderLink()}
          {this.props.children}
        </div>
        {this.props.menu && (
          <ModalMenuContainer
            vacanciesCount={this.props.vacanciesCount}
            menu={this.props.menu}
            mobileMenu={this.props.mobileMenu}
          />
        )}
      </header>
    );
  }
}

Header.defaultProps = {
  logoLink: "",
  menuIsOpened: false,
  menuClose: () => { },
  onHamburgerClick: () => { },
  redirectUrl: "",
  menuOpen: () => { },
  modalIsOpened: false,
  scrollSize: undefined,
  vacanciesCount: undefined,
  filterList: undefined,
  mod: "",
  menu: undefined,
  mobileMenu: undefined,
  scrollMenu: undefined,
  videoPlay: undefined,
  linkScroll: undefined,
  phone: undefined,
  mark: undefined
};

Header.propTypes = {
  logoLink: PropTypes.string,
  menuIsOpened: PropTypes.bool,
  menuClose: PropTypes.func,
  onHamburgerClick: PropTypes.func,
  redirectUrl: PropTypes.string,
  menuOpen: PropTypes.func,
  modalIsOpened: PropTypes.bool,
  scrollSize: PropTypes.number,
  vacanciesCount: PropTypes.number,
  filterList: PropTypes.array,
  mod: PropTypes.string,
  menu: PropTypes.array,
  mobileMenu: PropTypes.array,
  scrollMenu: PropTypes.array,
  videoPlay: PropTypes.object,
  children: PropTypes.any,
  linkScroll: PropTypes.object,
  longNav: PropTypes.bool,
  mark: PropTypes.any,
  phone: PropTypes.object
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
