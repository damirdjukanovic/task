import React, { PureComponent } from "react";
import "./Category.css";
import Header from "../../components/header/Header";
import ProductCard from "../../components/productCard/ProductCard";
import { Query } from "@apollo/client/react/components";
import { LOAD_CATEGORY, LOAD_ALL_PRODUCTS } from "../../GraphQL/Queries";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Category extends PureComponent {


  render() {
    const {history, overlayActive, page} = this.props;

    return (
      <React.Fragment>
      <Header history={history}/>
      <div className="Category">
        <div className="category-wrapper">
          {overlayActive && <div className="overlay"></div>}
          <h2 className="category-name">{page}</h2>
          <div className="products">
            <Query
              query={page === "all" ? LOAD_ALL_PRODUCTS : LOAD_CATEGORY}
              variables={{ input: { title: page } }}
            >
              {({ data, loading }) => {
                if (loading) return <p className="loading">Loading...</p>;
                return data.category.products.map((p) => {
                  return (
                    <ProductCard
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
      </React.Fragment>
    );
  }
}

Category.propTypes = {
  page: PropTypes.string,
  overlayActive: PropTypes.bool
};

const mapStateToProps = (state) => ({
  page: state.cart.page,
  overlayActive: state.cart.overlayActive
});

export default connect(mapStateToProps, null)(Category);
