import initialState from "../store/initialState";
import * as Actions from "./actions";

export const GroupsReducer = (state = initialState.group, action) => {
  switch (action.type) {
    case Actions.GROUP_IN:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const ShiftsListReducer = (state = initialState.shift, action) => {
  switch (action.type) {
    case Actions.FETCH_SHIFTLIST:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
