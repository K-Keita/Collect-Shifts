const initialState = {
  group: {
    groupName: "",
    groupId: "",
    administratorPassword: "",
    shiftList: [],
    memberList: [],
  },
  shift: {
    shiftList: [],
    // dateId: "",
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