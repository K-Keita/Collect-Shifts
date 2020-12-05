const initialState = {
  cards: {
    list: [],
  },
  card: {
    nextTaskList: [],
    prevTaskList: [],
    runTask: [],
    lookingBackText: "",
    scheduledTime: "",
    id: "",
    username: "",
    icon: "",
    enthusiasmText: "",
    hours: "",
    minutes: "",
    arr: [],
  },
  groups: {
    users: [],
    groupName: "",
    groupId: "",
  },
  users: {
    icon: "",
    isSignedIn: false,
    role: "",
    uid: "",
    enterGroups: [],
    username: "",
  },
};

export default initialState;
