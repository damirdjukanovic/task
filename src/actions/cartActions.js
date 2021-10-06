import {
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_SELECTED,
  SET_CURRENCY,
  ADD_AMOUNT,
  DEDUCT_AMOUNT,
  SET_PAGE,
} from "./types";
import { LOAD_ITEM } from "../GraphQL/Queries";
import { client } from "../App";

export const addToCart =
  (id, size = null) =>
  (dispatch, getState) => {
    client
      .query({
        query: LOAD_ITEM,
        variables: { id: id },
      })
      .then((res) => {
        if (getState().cart.products.some((p) => p.id === id)) return;
        if (res.data.product.inStock === false) return;
        let products = [...getState().cart.products];
        products.push({ ...res.data.product, selected: size, amount: 1 });
        window.localStorage.setItem("products", JSON.stringify(products));
        return dispatch({
          type: ADD_TO_CART,
          payload: { ...res.data.product, selected: size, amount: 1 },
        });
      });
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  let filteredProducts = getState().cart.products.filter((p) => p.id !== id);
  window.localStorage.setItem("products", JSON.stringify(filteredProducts));
  dispatch({
    type: REMOVE_ITEM,
    payload: filteredProducts,
  });
};

export const addAmount = (id) => (dispatch, getState) => {
  let increasedAmountProducts = getState().cart.products.map((p) => {
    if (p.id === id) {
      return { ...p, amount: p.amount + 1 };
    } else {
      return p;
    }
  });
  window.localStorage.setItem(
    "products",
    JSON.stringify(increasedAmountProducts)
  );
  dispatch({
    type: ADD_AMOUNT,
    payload: increasedAmountProducts,
  });
};

export const deductAmount = (id) => (dispatch, getState) => {
  let deductedAmountProducts = getState().cart.products.map((p) => {
    if (p.id === id) {
      return { ...p, amount: p.amount - 1 };
    } else {
      return p;
    }
  });
  window.localStorage.setItem(
    "products",
    JSON.stringify(deductedAmountProducts)
  );
  dispatch({
    type: DEDUCT_AMOUNT,
    payload: deductedAmountProducts,
  });
};

export const addSelected = (id, value) => (dispatch, getState) => {
  let newProducts = getState().cart.products.map((p) => {
    if (p.id === id) {
      return { ...p, selected: value };
    } else {
      return p;
    }
  });
  window.localStorage.setItem("products", JSON.stringify(newProducts));
  dispatch({
    type: ADD_SELECTED,
    payload: newProducts,
  });
};

export const setCurrency = (value) => (dispatch) => {
  let sign = null;
  if (value === "USD") {
    sign = "$";
  } else if (value === "JPY") {
    sign = "¥";
  } else if (value === "GBP") {
    sign = "£";
  } else if (value === "AUD") {
    sign = "$";
  } else if (value === "RUB") {
    sign = "₽";
  }

  dispatch({
    type: SET_CURRENCY,
    payload: { value: value, sign: sign },
  });
};

export const setPage = (page) => (dispatch) => {
  dispatch({
    type: SET_PAGE,
    payload: page,
  });
};
