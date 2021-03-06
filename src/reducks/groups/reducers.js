import initialState from "../store/initialState";
import * as Actions from "./actions";

export const GroupsReducer = (state = initialState.group, action) => {
  switch (action.type) {
    case Actions.GROUP_IN:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.GROUP_OUT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
