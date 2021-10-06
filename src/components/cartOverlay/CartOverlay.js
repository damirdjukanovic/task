import React, { Component } from "react";
import "../header/Header.css";
import "./CartOverlay.css";
import CartOverlayItem from "../cartOverlayItem/CartOverlayItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class CartOverlay extends Component {
  render() {
    let total = 0;
    this.props.products.map((p) => {
      let curr = p.prices.find((pr) => pr.currency === this.props.currency);
      return (total = total + p.amount * curr.amount);
    });
    return (
      <div className="cart-overlay">
        <div
          className={`cart-overlay-header ${
            this.props.products.length > 0 ? "overflow" : ""
          }`}
        >
          <p>
            <span>My Bag,</span> {this.props.products.length} items
          </p>
          {this.props.products.map((p) => (
            <CartOverlayItem product={p} key={p.id} />
          ))}
        </div>
        {this.props.products.length === 0 ? (
          <p className="no-products">No products added</p>
        ) : (
          <div className="cart-overlay-bottom">
            <div className="total-price-container">
              <p className="total">Total</p>
              <p className="total-price">
                {this.props.sign}
                {total.toFixed(2)}
              </p>
            </div>
            <div className="buttons">
              <Link to="/cart">
                <button className="view-bag">View Bag</button>
              </Link>
              <button className="checkout">Check Out</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

CartOverlay.propTypes = {
  products: PropTypes.array,
  currency: PropTypes.string,
  sign: PropTypes.string,
};

const mapStateToProps = (state) => ({
  products: state.cart.products,
  currency: state.cart.currency,
  sign: state.cart.sign,
});

export default connect(mapStateToProps, null)(CartOverlay);
