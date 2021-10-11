import { client } from "../App";
import { LOAD_ALL_PRODUCTS } from "../GraphQL/Queries";
import { ADD_ATTRIBUTE, CLEAR_ATTRIBUTES, LOAD_PRODUCTS } from "./types";

export const loadProducts = () => (dispatch) => {
  client.query({ query: LOAD_ALL_PRODUCTS }).then((res) => {
    window.localStorage.setItem(
      "allProducts",
      JSON.stringify(res.data.category.products)
    );
    dispatch({
      type: LOAD_PRODUCTS,
    });
  });
};

export const addAttribute = (id, name, value) => (dispatch, getState) => {
  const newState = getState().products.allProducts.map((p) => {
    if (p.id === id) {
      if (!p.selectedAttributes) {
        p.selectedAttributes = [];
      }

      if (p.selectedAttributes.length > 0) {
        for (let i = 0; i < p.selectedAttributes.length; i++) {
          if (p.selectedAttributes[i].name === name) {
            p.selectedAttributes.splice(i, 1);
          }
        }
        p.selectedAttributes.push({ name, value });
      } else {
        p.selectedAttributes.push({ name, value });
      }

      return p;
    } else {
      return p;
    }
  });
  window.localStorage.setItem("allProducts", JSON.stringify(newState));
  dispatch({
    type: ADD_ATTRIBUTE,
    payload: newState,
  });
};

export const clearAttributes = (id) => (dispatch, getState) => {
  const newState = getState().products.allProducts.map((p) => {
    if (p.id === id) {
      p.selectedAttributes = [];
      return p;
    } else {
      return p;
    }
  });
  dispatch({
    type: CLEAR_ATTRIBUTES,
    payload: newState,
  });
};
