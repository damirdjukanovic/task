import React, { PureComponent } from "react";
import "./Header.css";


import logo from "./VSFlogo.svg";
import CartOverlay from "../cartOverlay/CartOverlay";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrency, setPage } from "../../actions/cartActions";
import Currency from "../currencyDropdown/Currency";


class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }
 

  handleCategoryClick(e) {
    this.props.setPage(e.target.innerText.toLowerCase());
    if (this.props.location && this.props.location.pathname !== "/") {
      this.props.history.push("/");
      return;
    }
  }

  render() {
    return (
      <div className="Header">
        <img
          className="logo"
          src={logo}
          alt="logo"
          onClick={() => this.props.history.goBack()}
        />
        <div className="navigation">
          <div
            className={`${
              this.props.page === "clothes" ? "selected" : ""
            } header-element-short`}
            onClick={this.handleCategoryClick}
          >
            <p> Clothes </p>
          </div>
          <div
            className={`${
              this.props.page === "tech" ? "selected" : ""
            } header-element-short`}
            onClick={this.handleCategoryClick}
          >
            <p> Tech </p>
          </div>
          <div
            className={`${
              this.props.page === "all" ? "selected" : ""
            } header-element-short`}
            onClick={this.handleCategoryClick}
          >
            <p> All </p>
          </div>
        </div>
        <div className="actions">
          <Currency />
          <CartOverlay/>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  products: PropTypes.array,
  setCurrency: PropTypes.func,
  setPage: PropTypes.func,
  page: PropTypes.string,
  overlayActive: PropTypes.bool
};

const mapStateToProps = (state) => ({
  products: state.cart.products,
  page: state.cart.page,
  overlayActive: state.cart.overlayActive
});

export default connect(mapStateToProps, { setCurrency, setPage })(Header);
