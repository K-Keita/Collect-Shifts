

export const FETCH_GROUP = "FETCH_GROUP";
export const fetchGroupAction = (groupState) => {
  return {
    type: "FECTH_GROUP",
    payload: {
      groupName: groupState.groupName,
      groupId: groupState.groupId,
      administratorPassword: groupState.administratorPassword,
    }
  }
}