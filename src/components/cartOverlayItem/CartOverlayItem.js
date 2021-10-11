import React, { PureComponent } from "react";
import "./CartOverlayItem.css";
import vectorMinus from "./Vectorminus.svg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  removeFromCart,
  addSelected,
  addAmount,
  deductAmount,
} from "../../actions/cartActions";

class CartOverlayItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
    this.addToCounter = this.addToCounter.bind(this);
    this.deductFromCounter = this.deductFromCounter.bind(this);
    this.renderAttributes = this.renderAttributes.bind(this);
    this.renderAttributesTop = this.renderAttributesTop.bind(this);
  }
  addToCounter() {
    this.setState({ counter: this.state.counter + 1 });
  }

  deductFromCounter() {
    this.setState({ counter: this.state.counter - 1 });
  }
  componentDidUpdate() {
    const { product, removeFromCart } = this.props;
    if (product.amount === 0) {
      removeFromCart(this.props.product.id);
    }
  }

  renderAttributesTop(a) {
    return (
      <div className="cart-overlay-sizes-main">
        <div
          className={`cart-overlay-size`}
          style={{ background: a.name === "Color" ? a.value : "none" }}
        >
          <p>{a.name === "Color" ? "" : a.value}</p>
        </div>
      </div>
    );
  }

  renderAttributes(a) {
    if (a.name === "Touch ID in keyboard") {
      return (
        <div className="class-overlay-sizes-attributes touchID">
          <p className="cart-overlay-attribute">Touch ID</p>
          <div className="cart-overlay-size">
            <p>{a.value}</p>
          </div>
        </div>
      );
    } else if (a.name === "With USB 3 ports") {
      return (
        <div className="class-overlay-sizes-attributes usb">
          <p className="cart-overlay-attribute">Usb 3 ports</p>
          <div className="cart-overlay-size">
            <p>{a.value}</p>
          </div>
        </div>
      );
    } else return "";
  }

  renderPriceAndName() {
    const { product, currency, sign } = this.props;

    const str1 = product.name.substr(0, product.name.indexOf(" "));
    const str2 = product.name.substr(product.name.indexOf(" ") + 1);
    const price = product.prices.find((p) => p.currency === currency);
    const total = (price.amount * product.amount).toFixed(2);
    return (
      <React.Fragment>
        <div className="cart-overlay-name">
          <p>
            {str1.length > 0 ? str1 : str2}
            <br />
            {str1.length > 0 ? str2 : ""}
          </p>
        </div>
        <p className="cart-overlay-price">
          {sign}
          {total}
        </p>
      </React.Fragment>
    );
  }

  renderSizes() {
    const {product} = this.props;

    const attributesArr1 = product.selected.filter(
      (a) => a.name !== "Touch ID in keyboard" && a.name !== "With USB 3 ports"
    );
    const attributesArr2 = product.selected.filter(
      (a) => a.name !== "Color" && a.name !== "Capacity" && a.name !== "Size"
    );

    attributesArr2.sort((a,b) => a.name.length - b.name.length);
    attributesArr1.sort((a,b) => b.name.length - a.name.length);

    return (
      <div className="cart-overlay-sizes">
        <div className="cart-overlay-sizes-top">
          {attributesArr1.map((a, i) => (
            <div key={i} className="size-top">
              {this.renderAttributesTop(a)}
            </div>
          ))}
        </div>
        {attributesArr2.map((a, i) => (
          <div key={i}>{this.renderAttributes(a)}</div>
        ))}
      </div>
    );
  }
  render() {
    const { product, addAmount, deductAmount } = this.props;

    return (
      <div className="CartOverlayItem">
        <div className="cart-overlay-left">
          {this.renderPriceAndName()}
        </div>
        {this.renderSizes()}
        <div className="cart-overlay-right">
          <div className="box-plus" onClick={() => addAmount(product.id)}>
            +
          </div>
          <p className="cart-overlay-amount">{product.amount}</p>
          <div
            className="box-minus"
            onClick={() => deductAmount(product.id)}
          >
            <img src={vectorMinus} alt="" />
          </div>
          <img
            className="cart-overlay-img"
            src={product.gallery[0]}
            alt="cart product"
          />
        </div>
      </div>
    );
  }
}

CartOverlayItem.propTypes = {
  removeFromCart: PropTypes.func,
  addSelected: PropTypes.func,
  currency: PropTypes.string,
  sign: PropTypes.string,
  addAmount: PropTypes.func,
  deductAmount: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currency: state.cart.currency,
  sign: state.cart.sign,
});

export default connect(mapStateToProps, {
  removeFromCart,
  addSelected,
  addAmount,
  deductAmount,
})(CartOverlayItem);
