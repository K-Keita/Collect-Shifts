import { createSelector } from "reselect";

const groupsSelector = (state) => state.groups;

export const getGroupIcon = createSelector(
  [groupsSelector],
  (state) => state.groupIcon
);

export const getGroupId = createSelector(
  [groupsSelector],
  (state) => state.groupId
);

export const getGroupName = createSelector(
  [groupsSelector],
  (state) => state.groupName
);

export const getGroupMembers = createSelector(
  [groupsSelector],
  (state) => state.groupMembers
);