import React, { PureComponent } from "react";
import Category from "./pages/category/Category";
import ProductDescription from "./pages/productDescription/ProductDescription";
import Cart from "./pages/cart/Cart";
import { Switch, Route } from "react-router-dom";


export default class Main extends PureComponent {
  render() {
    
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => <Category {...routeProps} />}
        />
        <Route
          exact
          path="/product/:id"
          render={(routeProps) => <ProductDescription {...routeProps} />}
        />
        <Route
          exact
          path="/cart"
          render={(routeProps) => <Cart {...routeProps} />}
        ></Route>
      </Switch>
    );
  }
}
