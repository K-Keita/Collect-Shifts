const initialState = {
  group: {
    groupName: "",
    groupId: "",
    groupPassword: "",
    memberList: [],
  },
  shift: {
    shiftList: [],
    prevShiftList: [],
  },
  users: {
    isSignedIn: false,
    role: "",
    uid: "",
    username: "",
    shift: [],
    management: false,
    groupId: "",
  },
};

export default initialState;