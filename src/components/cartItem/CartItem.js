import React, { PureComponent } from 'react';
import "./CartItem.css";
import CartMinus from "./Vectorcart-minus.svg";
import CartPlus from "./Vectorcart-plus.svg"
import arrowLeft from "./VectorarrowLeft.svg"
import arrowRight from "./VectorarrowRight.svg"
import {connect} from "react-redux";
import PropTypes from "prop-types"; 
import {removeFromCart, addSelected, addAmount, deductAmount} from "../../actions/cartActions";

class CartItem extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      imgIndex: 0,
      images:null
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
      if(this.state.imgIndex !== 0){
        this.setState({imgIndex: this.state.imgIndex - 1})
    }
  }

  componentDidUpdate(){
    const {product, removeFromCart} = this.props;
    if(product.amount === 0) {
      removeFromCart(product.id);
    }
  }

  renderAttributes(a){
    if(a.name === "Touch ID in keyboard"){
    return (
      <div className="class-overlay-sizes-attributes touchID">
        <p className="cart-overlay-attribute">Touch ID</p>
        <div className="cart-overlay-size">
          <p>{a.value}</p>
        </div>
      </div>)
    } else if(a.name === "With USB 3 ports"){
      return (
        <div className="class-overlay-sizes-attributes usb">
          <p className="cart-overlay-attribute">Usb 3 ports</p>
          <div className="cart-overlay-size">
            <p>{a.value}</p>
          </div>
        </div>)
      } else return "";
    }

  renderItems(){
    const {product} = this.props;
    const sortedArr = product.selected;
    sortedArr.sort((a, b) => b.name.length - a.name.length);

    return (
      sortedArr.map(a => (
        <div className="cart-item-attributes-container" key={a.name}>
          <p className="cart-item-attribute-name">{a.name + ":"}</p>  
          <div className="cart-item-size" style={{background: a.name === "Color" ? a.value : "#1D1F22"}}>
            <p>{a.name === "Color" ? "" : a.value }</p>
          </div>
          </div>
      ))
    )
  }

  renderImages(){
    const {product} = this.props;

    return(
      <React.Fragment>
      {this.state.imgIndex !== 0 && 
        <img className="arrow-left-svg" src={arrowLeft} alt="arrow left" onClick={() => this.changePictureLeft(product.gallery)}/>}    
      {(product.gallery.length - 1 !== this.state.imgIndex) && 
        <img className="arrow-right-svg" src={arrowRight} alt="arrow right" onClick={() => this.changePictureRight(product.gallery)}/>}
      </React.Fragment>
    )
  }
  
  render() {
    const {product, currency, sign, deductAmount} = this.props;

    const str1 = product.name.substr(0, product.name.indexOf(" "));
    const str2 = product.name.substr(product.name.indexOf(" ") + 1);
    const price = product.prices.find(p => p.currency === currency)
    let total = (price.amount * product.amount).toFixed(2);
    const renderNameFirst = str1.length > 0 ? str1 : str2;
    const renderNameSecond = str1.length > 0 ? str2 : "";
    return (
      <div className="cart-main">
      <hr />
        <div className="CartItem">
          <div className="cart-item-left">
            <p className="cart-item-name">{renderNameFirst}</p>
            <p className="cart-item-span">{renderNameSecond}</p>
            <p className="cart-item-price">{sign}{total}</p>
            <div className="cart-item-sizes">
            {this.renderItems()}
            </div>
          </div>
          <div className="cart-item-right">
            <img className="cart-item-picture" src={product.gallery[this.state.imgIndex]} alt="product" />
            {this.renderImages()}
            <div className="plus-square" onClick={() => this.props.addAmount(product.id)}>
              <div className="square-container">
                <img className="minus-svg" src={CartMinus} alt="plus" />
                <img className="plus-svg" src={CartPlus} alt="plus" />
              </div>
            </div>
            <p>{product.amount}</p>
            <div className="minus-square" onClick={() => deductAmount(product.id)}><img src={CartMinus} alt="minus" /></div>
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