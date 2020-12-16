import { createSelector } from "reselect";

const userSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
);

export const getUserName = createSelector(
  [userSelector],
  (state) => state.username
);

export const getUserGroupId = createSelector(
  [userSelector],
  (state) => state.groupId
);

export const getUserId = createSelector([userSelector], (state) => state.uid);
