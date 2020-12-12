export const GROUP_IN = "GROUP_IN";
export const groupInAction = (groupState) => {
  return {
    type: "GROUP_IN",
    payload: {
      groupName: groupState.groupName,
      groupId: groupState.groupId,
      administratorPassword: groupState.administratorPassword,
      memberList: groupState.memberList,
      managementList: groupState.managementList,
    }
  }
}

export const FETCH_SHIFTLIST = "FETCH_SHIFTLIST";
export const fetchShiftsListAction = (shiftState) => {
  return {
    type: "FETCH_SHIFTLIST",
    payload: {
      shiftList: shiftState.shiftList,
    }
  }
}