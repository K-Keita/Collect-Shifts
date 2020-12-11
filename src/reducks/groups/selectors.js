import { createSelector } from "reselect";

const groupsSelector = (state) => state.groups;
const shiftsSelector = (state) => state.shifts;

export const getGroupId = createSelector(
  [groupsSelector],
  state => state.groupId
)

export const getGroupName = createSelector(
  [groupsSelector],
  state => state.groupName
);

export const getShiftList = createSelector(
  [shiftsSelector],
  state => state.shiftList
)

export const getMemberList = createSelector(
  [groupsSelector],
  state => state.memberList
)