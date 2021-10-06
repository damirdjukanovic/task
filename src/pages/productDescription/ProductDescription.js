import React, { Component } from "react";
import "./ProductDescription.css";
import Header from "../../components/header/Header";
import { Query } from "@apollo/client/react/components";
import { LOAD_ITEM } from "../../GraphQL/Queries";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSelected, addToCart } from "../../actions/cartActions";
import Attribute from "../../components/attribute/Attribute";

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverlayActive: false,
      currentImgIndex: 0,
      sizeSelected: null,
    };
    this.setIsOverlayActive = this.setIsOverlayActive.bind(this);
    this.setCurrentImgIndex = this.setCurrentImgIndex.bind(this);
    this.handleAttributeClick = this.handleAttributeClick.bind(this);
  }

  setIsOverlayActive() {
    this.setState({ isOverlayActive: !this.state.isOverlayActive });
  }

  setCurrentImgIndex(i) {
    this.setState({ currentImgIndex: i });
  }

  handleAttributeClick(i) {
    this.setState({ sizeSelected: i });
  }

  render() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
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
                (p) => p.currency === this.props.currency
              );

              return (
                <React.Fragment>
                  <Header
                    setIsOverlayActive={this.setIsOverlayActive}
                    history={this.props.history}
                    location={this.props.location}
                  />
                  <div className="product-description-body">
                    {this.state.isOverlayActive && (
                      <div className="overlay"></div>
                    )}
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
                          {data.product.attributes.length > 0 &&
                            data.product.attributes.map((a) => (
                              <Attribute
                                id={id}
                                a={a}
                                data={data}
                                handleAttributeClick={this.handleAttributeClick}
                                key={a.name}
                              />
                            ))}
                          <p className="product-description-price">price:</p>
                          <p className="product-description-price-value">
                            {this.props.sign}
                            {price.amount}
                          </p>
                          <button
                            className={`product-description-button ${
                              data.product.inStock === false ? "disabled" : ""
                            }`}
                            onClick={() =>
                              this.props.addToCart(
                                data.product.id,
                                this.state.sizeSelected
                              )
                            }
                          >
                            add to cart
                          </button>
                          <p
                            className="product-description-description"
                            dangerouslySetInnerHTML={{
                              __html: data.product.description,
                            }}
                          ></p>
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
};

const mapStateToProps = (state) => ({
  currency: state.cart.currency,
  sign: state.cart.sign,
});

export default connect(mapStateToProps, { addSelected, addToCart })(
  ProductDescription
);
