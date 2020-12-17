export const GROUP_IN = "GROUP_IN";
export const groupInAction = (groupState) => {
  return {
    type: "GROUP_IN",
    payload: {
      groupName: groupState.groupName,
      groupId: groupState.groupId,
      groupPassword: groupState.groupPassword,
      memberList: groupState.memberList,
      managementList: groupState.managementList,
      groupIcon: groupState.groupIcon,
    },
  };
};

export const GROUP_OUT = "GROUP_OUT";
export const groupOutAction = () => {
  return {
    type: "GROUP_OUT",
    payload: {
      groupName: "",
      groupId: "",
      groupPassword: "",
      memberList: "",
      managementList: "",
      groupIcon: "",
    },
  };
};

export const FETCH_SHIFTLIST = "FETCH_SHIFTLIST";
export const fetchShiftsListAction = (shiftState) => {
  return {
    type: "FETCH_SHIFTLIST",
    payload: {
      shiftList: shiftState.shiftList,
      prevShiftList: shiftState.prevShiftList,
    },
  };
};
