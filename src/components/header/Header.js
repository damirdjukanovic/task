import React, { Component } from "react";
import "./Header.css";
import cart from "./Vector.svg";
import currArrowUp from "./Vectorcurr.svg";
import currArrowDown from "./Vectordown.svg";
import logo from "./VSFlogo.svg";
import CartOverlay from "../cartOverlay/CartOverlay";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrency, setPage } from "../../actions/cartActions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartClicked: false,
      isCurrClicked: false,
      setIsOverlayActive: props.setIsOverlayActive,
    };
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleCurrClick = this.handleCurrClick.bind(this);
    this.handleClothesClick = this.handleClothesClick.bind(this);
    this.handleTechClick = this.handleTechClick.bind(this);
  }

  handleCartClick() {
    this.setState({ isCartClicked: !this.state.isCartClicked });
    this.state.setIsOverlayActive();
  }

  handleCurrClick() {
    this.setState({ isCurrClicked: !this.state.isCurrClicked });
  }

  handleClothesClick() {
    this.props.setPage("clothes");
    if (this.props.location && this.props.location.pathname !== "/") {
      this.props.history.push("/");
      return;
    }
  }

  handleTechClick() {
    this.props.setPage("tech");
    if (this.props.location && this.props.location.pathname !== "/") {
      this.props.history.push("/");
      return;
    }
  }

  render() {
    return (
      <div className="Header">
        <img className="logo" src={logo} alt="logo" />
        <div className="navigation">
          <div
            className={`${
              this.props.page === "clothes" ? "selected" : ""
            } header-element-short`}
            onClick={this.handleClothesClick}
          >
            <p>Clothes</p>
          </div>
          <div
            className={`${
              this.props.page === "tech" ? "selected" : ""
            } header-element-short`}
            onClick={this.handleTechClick}
          >
            <p>Tech</p>
          </div>
        </div>
        <div className="actions">
          <div className="currency-group" onClick={this.handleCurrClick}>
            <p className="currency">$</p>
            <img
              src={this.state.isCurrClicked ? currArrowDown : currArrowUp}
              alt="currency"
            />
          </div>
          <img
            className="cart"
            src={cart}
            alt="cart"
            onClick={this.handleCartClick}
          />
          {this.props.products.length > 0 && (
            <div className="cart-circle">
              <p>{this.props.products.length}</p>
            </div>
          )}
        </div>
        {this.state.isCurrClicked && (
          <div className="currency-dropdown">
            <p onClick={() => this.props.setCurrency("USD")}>$ USD</p>
            <p onClick={() => this.props.setCurrency("RUB")}>₽ RUB</p>
            <p onClick={() => this.props.setCurrency("JPY")}>¥ JPY</p>
            <p onClick={() => this.props.setCurrency("GBP")}>£ GBP</p>
            <p onClick={() => this.props.setCurrency("AUD")}>$ AUD</p>
          </div>
        )}
        {this.state.isCartClicked && <CartOverlay />}
      </div>
    );
  }
}

Header.propTypes = {
  products: PropTypes.array,
  setCurrency: PropTypes.func,
  setPage: PropTypes.func,
  page: PropTypes.string,
};

const mapStateToProps = (state) => ({
  products: state.cart.products,
  page: state.cart.page,
});

export default connect(mapStateToProps, { setCurrency, setPage })(Header);
