export const GROUP_IN = "GROUP_IN";
export const groupInAction = (groupState) => {
  return {
    type: "GROUP_IN",
    payload: {
      groupName: groupState.groupName,
      groupId: groupState.groupId,
      administratorPassword: groupState.administratorPassword,
      memberList: groupState.memberList,
    }
  }
}

export const FETCH_SHIFTLIST = "FETCH_SHIFTLIST";
export const fetchShiftsListAction = (shiftState) => {
  console.log(shiftState.shiftList)
  return {
    type: "FETCH_SHIFTLIST",
    payload: {
      shiftList: shiftState.shiftList,
      // dateId: shiftState.dateId
    }
  }
}