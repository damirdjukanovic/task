import React, { Component } from "react";
import "./Cart.css";
import Header from "../../components/header/Header";
import CartItem from "../../components/cartItem/CartItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverlayActive: false,
    };
    this.setIsOverlayActive = this.setIsOverlayActive.bind(this);
  }

  setIsOverlayActive() {
    this.setState({ isOverlayActive: !this.state.isOverlayActive });
  }

  render() {
    return (
      <div className="Cart">
        <Header
          setIsOverlayActive={this.setIsOverlayActive}
          history={this.props.history}
          location={this.props.location}
        />
        <div className="cart-body">
          {this.state.isOverlayActive && <div className="overlay"></div>}
          <h3>CART</h3>
          {this.props.products.map((p) => (
            <CartItem product={p} key={p.id} />
          ))}
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  products: PropTypes.array,
  currency: PropTypes.string,
  sign: PropTypes.string,
};

const mapStateToProps = (state) => ({
  products: state.cart.products,
  currency: state.cart.currency,
  sign: state.cart.sign,
});

export default connect(mapStateToProps, null)(Cart);
