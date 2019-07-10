import React, { Component } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import classNames from "classnames";
import { connect } from "react-redux";

import Menu from "../MenuInner";
import { Transition } from "react-transition-group";

import { actions } from "../../modules/modal.js";

import "./styles.styl";

const FadeClasses = {
  entering: "FadeMenu FadeMenu-entering",
  entered: "FadeMenu FadeMenu-entered",
  exiting: "FadeMenu FadeMenu-exiting",
  exited: "FadeMenu FadeMenu-exited"
};

const Fade = ({ in: inProp, onExited: onExitedProp, children, animLayout }) => (
  <Transition
    in={inProp}
    timeout={{ enter: 0, exit: 200 }}
    onExited={onExitedProp}
    unmountOnExit
  >
    {state => {
      if (animLayout) {
        if (state !== "exited") {
          document.getElementById("app").className = `modal-${state}`;
        } else {
          document.getElementById("app").className = "";
        }
      }
      return <div className={FadeClasses[state]}>{children}</div>;
    }}
  </Transition>
);

class ModalMenuContainer extends Component {
  static propTypes = {
    closeModal: PropTypes.func,
    onClose: PropTypes.func,
    modalMenuProps: PropTypes.any,
    mod: PropTypes.string,
    finalCloseModal: PropTypes.func,
    modalMenuIsHiding: PropTypes.bool
  };
  state = {
    height: 0
  };
  componentDidMount() {
    this.setHeight();
    window.addEventListener("scroll", this.setHeight);
  }
  setHeight = () => {
    if (this.state.height !== window.innerHeight) {
      this.setState({
        height: window.innerHeight
      });
    }
  };

  closeModal = () => {
    const { modalMenuProps, closeModal } = this.props;
    closeModal();
    const onClose = get(modalMenuProps, "onClose", () => {});
    onClose();
  };

  render() {
    const {
      modalMenuIsHiding,
      modalMenuProps = {},
      mod,
      finalCloseModal
    } = this.props;
    const type = get(modalMenuProps, "type", "");
    const animLayout = get(modalMenuProps, "animLayout", false);

    const modalStyle = classNames({
      ModalMenuContainer: true,
      [`ModalMenuContainer_${type}`]: type,
      [`ModalMenuContainer_${mod || "simple"}`]: mod || "simple"
    });

    return (
      <Fade
        in={!modalMenuIsHiding}
        onExited={finalCloseModal}
        animLayout={animLayout}
      >
        <div className={modalStyle} style={{ height: this.state.height }}>
          <div className="ModalMenuContainer__content">
            <Menu
              vacanciesCount={this.props.vacanciesCount}
              menu={this.props.menu}
              mobileMenu={this.props.mobileMenu}
            />
          </div>
        </div>
      </Fade>
    );
  }
}

const mapStateToProps = state => ({ ...state.modal, ...state.ui });
const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(actions.closeModalMenu()),
    finalCloseModal: () => dispatch(actions.finalCloseModal())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalMenuContainer);
