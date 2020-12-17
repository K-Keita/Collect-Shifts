import { createSelector } from "reselect";

const groupsSelector = (state) => state.groups;
const shiftsSelector = (state) => state.shifts;

export const getGroupId = createSelector(
  [groupsSelector],
  (state) => state.groupId
);

export const getGroupIcon = createSelector(
  [groupsSelector],
  (state) => state.groupIcon
);

export const getGroupName = createSelector(
  [groupsSelector],
  (state) => state.groupName
);

export const getManagementList = createSelector(
  [groupsSelector],
  (state) => state.managementList
);

export const getMemberList = createSelector(
  [groupsSelector],
  (state) => state.memberList
);
export const getPrevShiftList = createSelector(
  [shiftsSelector],
  (state) => state.prevShiftList
);

export const getShiftList = createSelector(
  [shiftsSelector],
  (state) => state.shiftList
);
