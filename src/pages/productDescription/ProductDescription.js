import React, { PureComponent } from "react";
import "./ProductDescription.css";
import Header from "../../components/header/Header";
import { Query } from "@apollo/client/react/components";
import { LOAD_ITEM } from "../../GraphQL/Queries";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSelected, addToCart } from "../../actions/cartActions";
import { clearAttributes } from "../../actions/productsActions";
import Attribute from "../../components/attribute/Attribute";
import { Parser } from 'html-to-react'

class ProductDescription extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImgIndex: 0,
      sizeSelected: [],
    };
    this.setCurrentImgIndex = this.setCurrentImgIndex.bind(this);
    this.handleAttributeClick = this.handleAttributeClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  setCurrentImgIndex(i) {
    this.setState({ currentImgIndex: i });
  }

  handleAttributeClick(i) {
    const newSizes = this.state.sizeSelected.filter((s) => s.name !== i.name);
    this.setState((prevState) => ({
      sizeSelected: [...newSizes, i],
    }));
  }

  handleAddToCart(id, sizeSelected) {
    const { addToCart, clearAttributes } = this.props;
    addToCart(id, sizeSelected);
    clearAttributes(id);
    this.setState({ sizeSelected: [] });
  }

  renderImagesList(data) {
    return (
      <div className="product-images-list">
        {data.product.gallery.map((i, index) => (
          <img
            key={index}
            className="product-image-left"
            src={data.product.gallery[index]}
            alt="product"
            onClick={() => this.setCurrentImgIndex(index)}
          />
        ))}
      </div>
    );
  }

  renderAttributes(data) {
    return (
      <React.Fragment>
        {data.product.attributes.length > 0 &&
          data.product.attributes.map((a) => (
            <Attribute
              id={data.product.id}
              a={a}
              key={a.name}
              handleAttributeClick={this.handleAttributeClick}
            />
          ))}
      </React.Fragment>
    );
  }

  renderPrice(sign, price) {
    return (
      <React.Fragment>
        <p className="product-description-price">price:</p>
        <p className="product-description-price-value">
          {sign}
          {price.amount}
        </p>
      </React.Fragment>
    );
  }

  renderButton(data) {
    return (
      <button
        className={`product-description-button ${
          data.product.inStock === false ? "disabled" : ""
        }`}
        onClick={() =>
          this.handleAddToCart(data.product.id, this.state.sizeSelected)
        }
      >
        add to cart
      </button>
    );
  }
  render() {
    const { id } = this.props.match.params;
    const { history, location, currency, overlayActive, sign } = this.props;
    return (
      <React.Fragment>
        <Header history={history} location={location} />
        <div className="ProductDescription">
          <Query query={LOAD_ITEM} variables={{ id: id }}>
            {({ data, loading }) => {
              if (loading) return <p className="loading">Loading...</p>;
              const str1 = data.product.name.substr(
                0,
                data.product.name.indexOf(" ")
              );
              const str2 = data.product.name.substr(
                data.product.name.indexOf(" ") + 1
              );
              const price = data.product.prices.find(
                (p) => p.currency === currency
              );

              return (
                <React.Fragment>
                  <div className="product-description-body">
                    {overlayActive && <div className="overlay"></div>}
                    {this.renderImagesList(data)}
                    <div className="product-description-main">
                      <div className="product-description-main-wrapper">
                        <img
                          className="main-img"
                          src={data.product.gallery[this.state.currentImgIndex]}
                          alt="product"
                        />
                        <div className="product-description-main-right">
                          <p className="product-name-right">
                            {str1.length > 0 ? str1 : str2}
                          </p>
                          <p className="product-name-span">
                            {str1.length > 0 ? str2 : ""}
                          </p>
                          {this.renderAttributes(data)}
                          {this.renderPrice(sign, price)}
                          {this.renderButton(data)}
                          <div className="product-description-description">
                            {Parser().parse(data.product.description)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            }}
          </Query>
        </div>
      </React.Fragment>
    );
  }
}

ProductDescription.propTypes = {
  currency: PropTypes.string,
  sign: PropTypes.string,
  addSelected: PropTypes.func,
  addToCart: PropTypes.func,
  overlayActive: PropTypes.bool,
  clearAttributes: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currency: state.cart.currency,
  sign: state.cart.sign,
  overlayActive: state.cart.overlayActive,
});

export default connect(mapStateToProps, {
  addSelected,
  addToCart,
  clearAttributes,
})(ProductDescription);
