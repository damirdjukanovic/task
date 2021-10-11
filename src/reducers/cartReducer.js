/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_TO_CART, 
  REMOVE_ITEM, 
  ADD_SELECTED, 
  SET_CURRENCY, 
  ADD_AMOUNT, 
  DEDUCT_AMOUNT,
  SET_PAGE,
  SET_OVERLAY,
  INCREASE_AMOUNT} from "../actions/types";

const initialState = {
  products : JSON.parse(window.localStorage.getItem("products")) || [],
  currency: "USD",
  sign: "$",
  page: "clothes",
  overlayActive: false,
}

export default function(state=initialState, action) {
  switch(action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case INCREASE_AMOUNT:
      return {
        ...state,
        products: action.payload
      }; 
    case REMOVE_ITEM:
      return {
        ...state,
        products: action.payload
      }; 
    case ADD_SELECTED:
      return{
        ...state,
        products: action.payload
      };
    case SET_CURRENCY: 
      return {
        ...state,
        currency: action.payload.value,
        sign: action.payload.sign
      };
    case ADD_AMOUNT:
      return {
        ...state,
        products: action.payload
      };
    case DEDUCT_AMOUNT:
      return {
        ...state,
        products: action.payload
      };
      case SET_PAGE:
        return{
          ...state,
          page: action.payload
        };
      case SET_OVERLAY: 
        return{
          ...state,
          overlayActive: action.payload
        }
      default:
        return state;
  }
}