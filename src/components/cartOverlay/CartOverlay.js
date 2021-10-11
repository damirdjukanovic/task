import React, { PureComponent } from "react";
import "../header/Header.css";
import "./CartOverlay.css";
import CartOverlayItem from "../cartOverlayItem/CartOverlayItem";
import { connect } from "react-redux";
import { setOverlay } from "../../actions/cartActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import cart from "./Vector.svg";

class CartOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCartClicked: false,
    };
    this.handleCartClose = this.handleCartClose.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  componentDidUpdate() {
    this.props.setOverlay(this.state.isCartClicked);
  }

  handleCartClose() {
    this.setState({ isCartClicked: false });
  }

  handleCartClick() {
    this.setState({ isCartClicked: !this.state.isCartClicked });
  }

  handleClickOutside = (event) => {
    const domNode = ReactDOM.findDOMNode(this);
    console.log(domNode);

    if (!domNode || !domNode.contains(event.target)) {
      this.handleCartClose();
    }
  };

  renderProducts(){
    const {products, sign, setOverlay} = this.props;
    let total = 0;
    for(const product of products){
      const curr = product.prices.find((pr) => pr.currency === this.props.currency);
      total = total + (product.amount * curr.amount);
    };
    total = total.toFixed(2);

    return (
      <React.Fragment>
      {products.length === 0 ? (
        <p className="no-products"> No products added </p>
      ) : (
        <div className="cart-overlay-bottom">
          <div className="total-price-container">
            <p className="total"> Total </p>
            <p className="total-price">
              {sign} {total}
            </p>
          </div>
          <div className="buttons">
            <Link to="/cart">
              <button className="view-bag" onClick={() => setOverlay(false)}> View Bag </button>
            </Link>
            <button className="checkout"> Check Out </button>
          </div>
        </div>
      )}
      </React.Fragment>
    )
  }


  render() {
    const {products} = this.props;

    return (
      <div>
        <img
          className="cart"
          src={cart}
          alt="cart"
          onClick={this.handleCartClick}
        />
        {products?.length > 0 && (
          <div className="cart-circle">
            <p> {products.length} </p>
          </div>
        )}
        {this.state.isCartClicked && (
          <div className="cart-overlay">
            <div
              className={`cart-overlay-header ${
                products.length > 0 ? "overflow" : ""
              }`}
            >
              <p>
                <span> My Bag, </span> {products.length} items
              </p>
              {products.map((p) => (
                <CartOverlayItem product={p} key={p.id} />
              ))}
            </div>
            {this.renderProducts()}
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
  overlayActive: PropTypes.bool,
  setOverlay: PropTypes.func,
};

const mapStateToProps = (state) => ({
  products: state.cart.products,
  currency: state.cart.currency,
  sign: state.cart.sign,
  overlayActive: state.cart.overlayActive,
});

export default connect(mapStateToProps, { setOverlay })(CartOverlay);
