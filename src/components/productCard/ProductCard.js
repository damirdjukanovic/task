import React, { Component } from "react";
import "./ProductCard.css";
import cartButton from "./cartButton.svg";
import { addToCart } from "../../actions/cartActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
  }

  handleLink() {
    this.props.history.push(`/product/${this.props.product.id}`);
  }

  render() {
    const price = this.props.product.prices.find(
      (p) => p.currency === this.props.currency
    );
    return (
      <div
        className={`ProductCard ${
          this.props.product.inStock === false ? "out-of-stock" : ""
        }`}
        onClick={this.handleLink}
      >
        <div className="product-card-wrapper">
          <div className="product-img-wrapper">
            {this.props.product.inStock === false && (
              <p className="out-of-stock-text">OUT OF STOCK</p>
            )}
            <img
              className="product-img"
              src={this.props.product.gallery[0]}
              alt=""
            />
            {this.props.product.inStock && (
              <span className="product-circle">
                <img src={cartButton} alt="cart button" />
              </span>
            )}
          </div>
          <div>
            <p className="product-name">{this.props.product.name}</p>
            <p className="product-price">
              {this.props.sign}
              {price.amount}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  addToCart: PropTypes.func,
  currency: PropTypes.string,
};

const mapStateToProps = (state) => ({
  currency: state.cart.currency,
  sign: state.cart.sign,
});

export default connect(mapStateToProps, { addToCart })(ProductCard);
