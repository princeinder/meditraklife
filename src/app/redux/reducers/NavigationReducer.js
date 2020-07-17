import { navigations } from "app/navigations";
import {
  SET_USER_NAVIGATION,
  ADD_MORE_NAVIGATION,
} from "../actions/NavigationAction";

const initialState = [...navigations];

const NavigationReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAVIGATION: {
      return [...action.payload];
    }
    case ADD_MORE_NAVIGATION: {
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default NavigationReducer;
