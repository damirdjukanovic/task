import React, { Component } from 'react';
import "./CartItem.css";
import CartMinus from "./Vectorcart-minus.svg";
import CartPlus from "./Vectorcart-plus.svg"
import arrowLeft from "./VectorarrowLeft.svg"
import arrowRight from "./VectorarrowRight.svg"
import {connect} from "react-redux";
import PropTypes from "prop-types"; 
import {removeFromCart, addSelected, addAmount, deductAmount} from "../../actions/cartActions";

class CartItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgIndex: 0
    }
    this.changePictureLeft = this.changePictureLeft.bind(this);
    this.changePictureRight = this.changePictureRight.bind(this);
  }

  changePictureRight(arr){
    if(arr.length - 1 !== this.state.imgIndex) {
      this.setState({imgIndex: this.state.imgIndex + 1})
    }
  }

  changePictureLeft(arr){
    if(this.state.imgIndex !== 0) {
      this.setState({imgIndex: this.state.imgIndex - 1})
    }
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
    const price = this.props.product.prices.find(p => p.currency === this.props.currency)
    let total = price.amount * this.props.product.amount;
    return (
      <div className="cart-main">
      <hr />
        <div className="CartItem">
          <div className="cart-item-left">
            <p className="cart-item-name">{str1.length > 0 ? str1 : str2}</p>
            <p className="cart-item-span">{str1.length > 0 ? str2 : ""}</p>
            <p className="cart-item-price">{this.props.sign}{total.toFixed(2)}</p>
            <div className="cart-item-sizes">
            {
              this.props.product.attributes[index].items.map(a => (
              <div className={`cart-item-size ${this.props.product.selected === a.value ? "selected-cart" : ""}`} key={a.value} onClick={() => this.props.addSelected(this.props.product.id, a.value)}>
                <p>{a.value}</p>
              </div>
            ))}
            </div>
          </div>
          <div className="cart-item-right">
            <img className="cart-item-picture" src={this.props.product.gallery[this.state.imgIndex]} alt="product" />
            {(this.state.imgIndex !== 0) &&
              <img className="arrow-left-svg" src={arrowLeft} alt="arrow left" onClick={() => this.changePictureLeft(this.props.product.gallery)}/>}
            {(this.props.product.gallery.length - 1 !== this.state.imgIndex) && 
              <img className="arrow-right-svg" src={arrowRight} alt="arrow right" onClick={() => this.changePictureRight(this.props.product.gallery)}/>}
            <div className="plus-square" onClick={() => this.props.addAmount(this.props.product.id)}>
              <div className="square-container">
                <img className="minus-svg" src={CartMinus} alt="plus" />
                <img className="plus-svg" src={CartPlus} alt="plus" />
              </div>
            </div>
            <p>{this.props.product.amount}</p>
            <div className="minus-square" onClick={() => this.props.deductAmount(this.props.product.id)}><img src={CartMinus} alt="minus" /></div>
          </div>
        </div>
      </div>
    )
  }
}


CartItem.propTypes = {
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

export default connect(mapStateToProps, {removeFromCart, addSelected, addAmount, deductAmount})(CartItem);