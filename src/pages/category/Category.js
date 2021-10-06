import React, { Component } from "react";
import "./Category.css";
import Header from "../../components/header/Header";
import ProductCard from "../../components/productCard/ProductCard";
import { Query } from "@apollo/client/react/components";
import { LOAD_CATEGORY } from "../../GraphQL/Queries";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverlayActive: false,
      isTechClicked: false,
      isClothesClicked: true,
    };
    this.setIsOverlayActive = this.setIsOverlayActive.bind(this);
    this.handleTechClick = this.handleTechClick.bind(this);
    this.handleClothesClick = this.handleClothesClick.bind(this);
  }

  setIsOverlayActive() {
    this.setState({ isOverlayActive: !this.state.isOverlayActive });
  }

  handleTechClick() {
    this.setState({ currentCategory: "tech" });
  }

  handleClothesClick() {
    this.setState({ currentCategory: "clothes" });
  }

  render() {
    return (
      <div className="Category">
        <Header
          setIsOverlayActive={this.setIsOverlayActive}
          handleClothesClick={this.handleClothesClick}
          handleTechClick={this.handleTechClick}
          isTechClicked={this.state.isTechClicked}
          isClothesClicked={this.state.isClothesClicked}
        />
        <div className="category-wrapper">
          {this.state.isOverlayActive && <div className="overlay"></div>}
          <h2 className="category-name">{this.state.currentCategory}</h2>
          <div className="products">
            <Query
              query={LOAD_CATEGORY}
              variables={{ input: { title: this.props.page } }}
            >
              {({ data, loading }) => {
                if (loading) return <p className="loading">Loading...</p>;
                return data.category.products.map((p) => {
                  return (
                    <ProductCard
                      history={this.props.history}
                      product={p}
                      key={p.id}
                    />
                  );
                });
              }}
            </Query>
          </div>
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  page: PropTypes.string,
};

const mapStateToProps = (state) => ({
  page: state.cart.page,
});

export default connect(mapStateToProps, null)(Category);
