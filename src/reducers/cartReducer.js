/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_TO_CART, 
  REMOVE_ITEM, 
  ADD_SELECTED, 
  SET_CURRENCY, 
  ADD_AMOUNT, 
  DEDUCT_AMOUNT,
  SET_PAGE} from "../actions/types";

const initialState = {
  products : JSON.parse(window.localStorage.getItem("products")),
  currency: "USD",
  sign: "$",
  page: "clothes"
}

export default function(state=initialState, action) {
  switch(action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload]
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
        }  
      default:
        return state;
  }
}