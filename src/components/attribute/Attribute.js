import React, { Component } from "react";
import "./Attribute.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSelected } from "../../actions/cartActions";

class Attribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: null,
      product: null,
      isClicked2: null,
    };
    this.handleAddSelected = this.handleAddSelected.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleAttributeClick(i) {
    this.setState({ isClicked: i });
  }

  handleAddSelected(i, p, v) {
    this.props.addSelected(p, v);
    this.props.handleAttributeClick(i);
  }

  disableIsClicked2() {
    this.setState({ isClicked2: null });
  }

  handleOnClick(i) {
    if (this.props.a.name === "Size" || this.props.a.name === "Capacity") {
      this.setState({ isClicked2: i.value });

      this.handleAddSelected(i.value, this.props.data.product.id, i.value);
      this.props.handleAttributeClick(i.value);
    } else {
      this.handleAttributeClick(i.value);
    }
  }

  render() {

    return (
      <React.Fragment>
        <p className="product-description-price">{this.props.a.name}</p>
        <div className="product-description-sizes">
          {this.props.a.items.map((i) => (
            <div
              key={i.value}
              className={`product-description-size-box ${
                this.props.a.type === "swatch" ? "color-circle" : ""
              } ${
                this.state.isClicked === i.value ||
                this.state.isClicked2 === i.value
                  ? "selected-cart"
                  : ""
              }`}
              style={{
                background: this.props.a.type === "swatch" ? i.value : "",
              }}
              onClick={() => {
                this.handleOnClick(i);
              }}
            >
              {this.props.a.type === "swatch" ? "" : i.value}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

Attribute.propTypes = {
  addSelected: PropTypes.func,
  products: PropTypes.array,
};

const mapStateToProps = (state) => ({
  products: state.cart.products,
});

export default connect(mapStateToProps, { addSelected })(Attribute);
