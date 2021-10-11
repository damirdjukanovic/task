import React, { PureComponent } from "react";
import "./Attribute.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSelected } from "../../actions/cartActions";
import { addAttribute } from "../../actions/productsActions";

class Attribute extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: null,
      product: this.props.allProducts.find((p) => p.id === this.props.id),
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    const atr = this.state.product.selectedAttributes?.find(
      (a) => a.name === this.props.a.name
    );
    this.setState({ isClicked: atr?.value });
  }

  componentDidUpdate() {
    const atr = this.state.product.selectedAttributes?.find(
      (a) => a.name === this.props.a.name
    );
    this.setState({ isClicked: atr?.value });
  }

  handleOnClick(id, name, value) {
    const { addAttribute, handleAttributeClick } = this.props;

    if (this.state.product.inStock) {
      addAttribute(id, name, value);
      this.setState({ isClicked: value });
      handleAttributeClick({ name: name, value: value });
    }
  }

  renderAttributes() {
    const { a, id } = this.props;

    return (
      <React.Fragment>
        {a.items.map((i) => (
          <div
            key={i.value}
            className={`product-description-size-box ${a.type === "swatch" ? "color-circle" : ""} 
            ${this.state.isClicked === i.value ? 
              `${a.type === "swatch" ? "selected-cart-color" : "selected-cart"}`
              : ""
            }`}
            style={{background: a.type === "swatch" ? i.value : ""}}
            onClick={() => {this.handleOnClick(id, a.name, i.value);}}
          >
            {a.type === "swatch" ? "" : i.value}
          </div>
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { a } = this.props;

    return (
      <React.Fragment>
        <p className="product-description-price">{a.name}</p>
        <div className="product-description-sizes">
          {this.renderAttributes()}
        </div>
      </React.Fragment>
    );
  }
}

Attribute.propTypes = {
  addSelected: PropTypes.func,
  products: PropTypes.array,
  addAttribute: PropTypes.func,
  allProducts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  products: state.cart.products,
  allProducts: state.products.allProducts,
});

export default connect(mapStateToProps, { addSelected, addAttribute })(
  Attribute
);
