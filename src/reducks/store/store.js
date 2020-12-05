import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import { CardsReducer, MyCardReducer } from "../cards/reducers";
import { GroupsReducer } from "../groups/reducers";
import { UsersReducer } from "../users/reducers";

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      card: MyCardReducer,
      cards: CardsReducer,
      groups: GroupsReducer,
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
