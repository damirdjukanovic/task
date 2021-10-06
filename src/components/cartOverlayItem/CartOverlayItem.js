import React, { Component } from 'react';
import "./CartOverlayItem.css";
import vectorMinus from "./Vectorminus.svg"
import {connect} from "react-redux";
import PropTypes from "prop-types"; 
import {removeFromCart, addSelected, addAmount, deductAmount} from "../../actions/cartActions";

class CartOverlayItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 1
    }
    this.addToCounter = this.addToCounter.bind(this);
    this.deductFromCounter = this.deductFromCounter.bind(this);
  }
  addToCounter(){
    this.setState({counter: this.state.counter + 1})
  }

  deductFromCounter(){
    this.setState({counter: this.state.counter - 1})
   
  }
  componentDidUpdate(){
    if(this.props.product.amount === 0) {
      this.props.removeFromCart(this.props.product.id);
    }
  }



  render() {
    const index = this.props.product.attributes.findIndex(p => p.type === "text");
    const str1 = this.props.product.name.substr(0, this.props.product.name.indexOf(" "));
    const str2 = this.props.product.name.substr(this.props.product.name.indexOf(" ") + 1);
    const price = this.props.product.prices.find(p => p.currency === this.props.currency);
    let total = price.amount * this.props.product.amount;
    return (
      <div className="CartOverlayItem">
        <div className="cart-overlay-left">
          <div className="cart-overlay-name">
            <p>{str1.length > 0 ? str1 : str2}<br />{str1.length > 0 ? str2 : ""}</p>
          </div>
          <p className="cart-overlay-price">
            {this.props.sign}{total.toFixed(2)}
          </p>
          <div className="cart-overlay-sizes">
          {
            this.props.product.attributes[index].items.map(a => (
            <div className={`cart-overlay-size ${this.props.product.selected === a.value ? "selected-cart-overlay" : ""}`} key={a.value} onClick={() => this.props.addSelected(this.props.product.id, a.value)}>
              <p>{a.value}</p>
            </div>
          ))}
          </div>
        </div>
        <div className="cart-overlay-right">
          <div className="box-plus" onClick={() => this.props.addAmount(this.props.product.id)}>
            +
          </div>
          <p className="cart-overlay-amount">{this.props.product.amount}</p>
          <div className="box-minus" onClick={() => this.props.deductAmount(this.props.product.id)}>
            <img src={vectorMinus} alt="" />
          </div>
          <img className="cart-overlay-img" src={this.props.product.gallery[0]} alt="" />
        </div>
      </div>
    )
  }
}

CartOverlayItem.propTypes = {
  removeFromCart: PropTypes.func,
  addSelected: PropTypes.func,
  currency: PropTypes.string,
  sign: PropTypes.string,
  addAmount: PropTypes.func,
  deductAmount: PropTypes.func
}

const mapStateToProps = (state) => ({
  currency: state.cart.currency,
  sign: state.cart.sign,
})

export default connect(mapStateToProps, {removeFromCart, addSelected, addAmount, deductAmount})(CartOverlayItem);