import React, { PureComponent } from "react";
import "./Cart.css";
import Header from "../../components/header/Header";
import CartItem from "../../components/cartItem/CartItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Cart extends PureComponent {

  render() {
    const {history, location, overlayActive, products} = this.props;
    return (
      <React.Fragment>
      <Header
          history={history}
          location={location}
        />
      <div className="Cart">
        <div className="cart-body">
        <div className="cart-body-wrapper">
        {overlayActive && <div className="overlay"></div>}
          <h3>CART</h3>
          {products.map((p) => (
            <CartItem product={p} key={p.id} />
          ))}
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

Cart.propTypes = {
  products: PropTypes.array,
  currency: PropTypes.string,
  sign: PropTypes.string,
  overlayActive: PropTypes.bool
};

const mapStateToProps = (state) => ({
  products: state.cart.products,
  currency: state.cart.currency,
  sign: state.cart.sign,
  overlayActive: state.cart.overlayActive
});

export default connect(mapStateToProps, null)(Cart);
