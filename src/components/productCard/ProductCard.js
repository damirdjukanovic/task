import React, { PureComponent } from "react";
import "./ProductCard.css";
import cartButton from "./cartButton.svg";
import { addToCart } from "../../actions/cartActions";
import { clearAttributes } from "../../actions/productsActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProductCard extends PureComponent {
  constructor(props) {
    super(props);
    this.renderShopCartIcon = this.renderShopCartIcon.bind(this);
    this.handleShopCartClick = this.handleShopCartClick.bind(this);
  }

  handleShopCartClick() {
    const {allProducts, product, addToCart, clearAttributes} = this.props;
    const attributeProduct = allProducts?.find(
      (p) => product.id === p.id
    );
    addToCart(
      product.id,
      attributeProduct.selectedAttributes
    );
    clearAttributes(product.id);
  }
  
  renderShopCartIcon() {
    const {allProducts, product} = this.props;
    const attributeProduct = allProducts?.find(
      (p) => product.id === p.id
    );
    if (
      ((attributeProduct.selectedAttributes &&
        attributeProduct.selectedAttributes.length > 0) ||
        product.attributes.length === 0) &&
        product.inStock === true
    ) {
      return (
        <span
          className="product-circle"
          onClick={() => this.handleShopCartClick()}
        >
          <img src={cartButton} alt="cart button" />
        </span>
      );
    }
  }

  render() {
    const {product, currency, sign} = this.props;
    const price = product?.prices.find(
      (p) => p.currency === currency
    );

    return (
      <div
        className={`ProductCard ${
          product.inStock === false ? "out-of-stock" : ""
        }`}
      >
        {this.renderShopCartIcon()}
        <Link to={`/product/${product.id}`}>
          <div className="product-card-wrapper">
            <div className="product-img-wrapper">
              {product.inStock === false && (
                <p className="out-of-stock-text">OUT OF STOCK</p>
              )}
              <img
                className="product-img"
                src={product.gallery[0]}
                alt=""
              />
            </div>
            <div>
              <p className="product-name">{product.name}</p>
              <p className="product-price">
                {sign}
                {price.amount}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

ProductCard.propTypes = {
  addToCart: PropTypes.func,
  currency: PropTypes.string,
  allProducts: PropTypes.array,
  clearAttributes: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currency: state.cart.currency,
  sign: state.cart.sign,
  allProducts: state.products.allProducts,
});

export default connect(mapStateToProps, { addToCart, clearAttributes })(
  ProductCard
);
