/* eslint-disable import/no-anonymous-default-export */
import {LOAD_PRODUCTS, ADD_ATTRIBUTE, CLEAR_ATTRIBUTES} from "../actions/types";

const initialState = {
  allProducts: JSON.parse(window.localStorage.getItem("allProducts"))
}

export default function(state=initialState, action){
  switch(action.type){
    case LOAD_PRODUCTS:
      return {
        ...state,
        allProducts: JSON.parse(window.localStorage.getItem("allProducts"))
      };
    case ADD_ATTRIBUTE:
      return {
        ...state,
        allProducts: action.payload
      };
    case CLEAR_ATTRIBUTES:
      return {
        ...state,
        allProducts: action.payload
      }
      default:
        return state
  }
}