import initialState from "../store/initialState";
import * as Actions from "./actions";


export const GroupsReducer = (state = initialState.groups, action) => {
  switch (action.type) {
    case Actions.FETCH_GROUP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
