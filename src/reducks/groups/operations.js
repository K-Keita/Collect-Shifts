import { db, FirebaseTimestamp } from "../../firebase/index";
import {
  fetchShiftsListAction,
  groupInAction,
  groupOutAction,
} from "../groups/actions";
import { saveGroupId, deleteGroupId, signOut } from "../users/operations";
import { push } from "connected-react-router";
import { SignalCellularOff } from "@material-ui/icons";

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;
const sun = d.getDay() === 0 ? 7 : d.getDay();
const s = d.getDate() + (14 - sun + 1);
const firstDate = new Date(y, m - 1, s);
const prevFirstDate = new Date(y, m - 1, s - 7);
const dateId = `${firstDate.getFullYear()}${firstDate.getMonth()}${firstDate.getDate()}`;
const prevDateId = `${prevFirstDate.getFullYear()}${prevFirstDate.getMonth()}${prevFirstDate.getDate()}`;

export const saveGroupIcon = (images, groupId, password) => {
  return async (dispatch) => {
    const snapshot = await db.collection("groups").doc(groupId).get();
    const data = snapshot.data();
    if (data.groupPassword !== password) {
      alert("パスワードが違います");
      return false;
    }

    const updateData = {
      groupIcon: images,
    };

    db.collection("groups")
      .doc(groupId)
      .set(updateData, { merge: true })
      .then(() => {
        dispatch(
          groupInAction({
            groupId: groupId,
            groupPassword: data.groupPassword,
            groupName: data.groupName,
            memberList: data.memberList,
            groupIcon: images,
          })
        );
        alert("アイコンを変更しました");
      });
  };
};

export const createGroup = (
  groupName,
  groupId,
  groupPassword,
  username,
  uid
) => {
  return async (dispatch) => {
    if (username === "" || uid === "") {
      alert("アカウントが必要です");
      dispatch(push("/signup"));
      return false;
    }
    if (groupId === "" || groupPassword === "") {
      alert("必須項目が未入力です。");
      return false;
    }
    if (db.collection("groups").doc(groupId).exists) {
      alert("IDが既に存在しています。別のIDを選択してください。");
      return false;
    }

    const timestamp = FirebaseTimestamp.now();
    const memberList = {
      name: username,
      id: uid,
      manage: true,
    };

    const initializeDate = {
      groupName: groupName,
      groupId: groupId,
      groupPassword: groupPassword,
      created_at: timestamp,
      updated_at: timestamp,
      memberList: [memberList],
      groupIcon: "",
    };

    dispatch(
      groupInAction({
        groupId: groupId,
        groupPassword: groupPassword,
        groupName: groupName,
        memberList: [memberList],
        groupIcon: "",
      })
    );

    db.collection("groups")
      .doc(groupId)
      .set(initializeDate)
      .then(() => {
        dispatch(saveGroupId(groupId, uid));
        dispatch(push("/"));
      });
  };
};

export const deleteShift = (groupId, username) => {
  return async (dispatch) => {
    const snapshot = await db
      .collection("groups")
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .get();
    const data = snapshot.data();
    const shiftList = data.shiftList;
    const upShift = [];

    shiftList.map((value) => {
      if (value.name === username) {
        return false;
      }
      return upShift.push(value);
    });
    const updateData = {
      shiftList: upShift,
    };
    db.collection("groups")
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .set(updateData, { merge: true })
      .then(() => {
        // dispatch(
        //   fetchShiftsListAction({
        //     shiftList: upShift,
        //     prevShiftList: data.prevShiftList,
        //   })
        // );
        console.log("pp");
      });
  };
};

export const exitGroup = (uid, groupId, username) => {
  return async (dispatch) => {
    if (
      !window.confirm(
        "このグループを退会します。本当によろしいですか？(退会すると自動でログアウトされます）"
      )
    ) {
      return false;
    }
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await db.collection("groups").doc(groupId).get();

    const data = snapshot.data();
    const memberList = data.memberList;

    const updateList = [];
    memberList.map((value) => {
      if (value.name === username && value.id === uid) {
        return false;
      }
      return updateList.push(value);
    });
    const updateData = {
      memberList: updateList,
      updated_at: timestamp,
    };
    db.collection("groups")
      .doc(groupId)
      .set(updateData, { merge: true })
      .then(() => {
        dispatch(groupOutAction());
        dispatch(deleteShift(groupId, username));
        dispatch(deleteGroupId(uid, groupId));
      });
  };
};

export const enterGroup = (groupname, groupId, username, uid) => {
  return async (dispatch) => {
    const id = String(groupId);
    const snapshot = await db.collection("groups").doc(id).get();

    if (!snapshot.exists) {
      alert("グループが存在しません");
      return false;
    }
    const data = snapshot.data();
    if (data.groupName !== groupname) {
      alert("グループ名とIDが一致しません");
      return false;
    }
    const memberList = data.memberList;

    const newMember = {
      name: username,
      id: uid,
      manage: false,
    };
    memberList.push(newMember);

    const newData = {
      memberList: memberList,
    };

    dispatch(
      groupInAction({
        groupId: data.groupId,
        groupPassword: data.groupPassword,
        groupName: data.groupName,
        memberList: memberList,
        groupIcon: data.groupIcon,
      })
    );

    dispatch(fetchShifts(groupId, dateId));

    db.collection("groups")
      .doc(id)
      .set(newData, { merge: true })
      .then(() => {
        dispatch(saveGroupId(groupId, uid, username));
      });
  };
};

export const fetchShifts = (groupId, dateId) => {
  const timestamp = FirebaseTimestamp.now();
  console.log("aa");
  if (groupId === "") {
    return false;
  }
  return async (dispatch) => {
    const snapshot = await db
      .collection("groups")
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .get();
    if (!snapshot.exists) {
      const prevSnapshot = await db
        .collection("groups")
        .doc(groupId)
        .collection("shiftsList")
        .doc(prevDateId)
        .get();
      const prevShiftData = [];
      if (prevSnapshot.exists) {
        const prevData = prevSnapshot.data();
        prevData.shiftList.forEach((value) => {
          prevShiftData.push(value);
        });
      }
      console.log(prevShiftData);

      const data = {
        shiftList: [],
        prevShiftList: prevShiftData,
        created_at: timestamp,
        updated_at: timestamp,
      };

      db.collection("groups")
        .doc(groupId)
        .collection("shiftsList")
        .doc(dateId)
        .set(data)
        .then(() => {
          console.log("create-table");
          dispatch(
            fetchShiftsListAction({
              shiftList: [],
              prevShiftList: prevShiftData,
            })
          );
        });
    } else {
      const data = snapshot.data();

      dispatch(
        fetchShiftsListAction({
          shiftList: data.shiftList,
          prevShiftList: data.prevShiftList,
        })
      );
    }
  };
};

// export const changeShiftName = (groupId, username, uid) => {
//   // const timestamp = FirebaseTimestamp.now();
//   return async (dispatch) => {
//     const snapshot = await db.collection("groups").doc(groupId).collection("shiftsList").doc(dateId).get()
//     const data = snapshot.data();
//     // const shiftList = data.shiftList;
//     // const prevShiftList = data.prevShiftList;
//     // console.log(data)
//     // if (shiftList.length > 0) {
//     //   shiftList.forEach(value => {
//     //     if (value.id === uid) {
//     //       value.name = username;
//     //     }
//     //   })
//     // }
//     // console.log(prevShiftList)
//     // if (prevShiftList.length > 0) {
//     //   prevShiftList.forEach(value => {
//     //     if (value.id === uid) {
//     //       value.name = username
//     //     }
//     //   })
//     // }
//     const updateData = {
//       shiftList: data.shiftList,
//       prevShiftList: data.prevShiftList
//     }

//     dispatch(fetchShiftsListAction(updateData))

//     const doc = await db.collection("groupId").doc(groupId).collection("shiftsList").doc(dateId).set(updateData, {merge: true})
//         console.log("tesutook");
//   }
// }

export const saveShifts = (groupId, shift, name, uid) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const doc = await db
      .collection("groups")
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .get();
    const newData = {
      name: name,
      list: shift,
      id: uid,
    };
    console.log(newData);

    if (doc.exists) {
      const data = doc.data();
      const shiftList = data.shiftList;
      const arr = [];
      shiftList.map((value) => {
        return arr.push(value.name);
      });
      if (arr.includes(newData.name)) {
        alert("既に登録されています。");
        return false;
      }

      shiftList.push(newData);

      const updateData = {
        shiftList: shiftList,
        updated_at: timestamp,
      };

      db.collection("groups")
        .doc(groupId)
        .collection("shiftsList")
        .doc(dateId)
        .set(updateData, { merge: true })
        .then(() => {
          dispatch(
            fetchShiftsListAction({
              shiftList: shiftList,
              prevShiftList: data.prevShiftList,
            })
          );
          alert("登録しました");
        });
    } else {
      const prevSnapshot = await db
        .collection("groups")
        .doc(groupId)
        .collection("shiftsList")
        .doc(prevDateId)
        .get();
      const prevShiftData = [];
      if (prevSnapshot.exists) {
        const prevData = prevSnapshot.data();
        prevShiftData.push(prevData);
      }

      const initializeDate = {
        shiftList: [newData],
        created_at: timestamp,
        prevShiftList: prevShiftData,
        updated_at: timestamp,
      };

      db.collection("groups")
        .doc(groupId)
        .collection("shiftsList")
        .doc(dateId)
        .set(initializeDate)
        .then(() => {
          console.log("create");
          dispatch(
            fetchShiftsListAction({
              prevShiftList: prevShiftData,
              shiftList: [newData],
            })
          );
          alert("登録しました");
        });
    }
  };
};
export const changeShiftName = (groupId, name, uid) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const doc = await db
      .collection("groups")
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .get();

    const data = doc.data();

    const shiftList = data.shiftList;
    const prevShiftList = data.prevShiftList;

    if (shiftList.length > 0) {
      shiftList.forEach((value) => {
        if (value.id === uid) {
          value.name = name;
        }
      });
    }

    if (prevShiftList.length > 0) {
      prevShiftList.forEach((value) => {
        if (value.id === uid) {
          value.name = name;
        }
      });
    }

    const updateData = {
      shiftList: shiftList,
      updated_at: timestamp,
      prevShiftList: prevShiftList,
    };

    db.collection("groups")
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .set(updateData, { merge: true })
      .then(() => {
        dispatch(
          fetchShiftsListAction({
            shiftList: shiftList,
            prevShiftList: prevShiftList,
          })
        );
        alert("変更しました");
      });
  };
};

export const registManage = (managePassword, uid, groupId) => {
  return async (dispatch) => {
    const snapshot = await db.collection("groups").doc(groupId).get();
    const data = snapshot.data();
    if (data.groupPassword !== managePassword) {
      alert("管理者パスワードが違います");
      return false;
    }

    const memberList = data.memberList;
    memberList.forEach((value) => {
      if (value.id === uid) {
        value.manage = true;
      }
    });
    const updateData = {
      memberList: memberList,
    };
    dispatch(
      groupInAction({
        groupId: data.groupId,
        groupPassword: data.groupPassword,
        groupName: data.groupName,
        memberList: memberList,
        groupIcon: data.groupIcon,
      })
    );
    db.collection("groups")
      .doc(groupId)
      .set(updateData, { merge: true })
      .then(() => {
        alert("管理者登録しました");
      });
  };
};

export const changeMemberName = (name, uid, groupId) => {
  return async (dispatch) => {
    const snapshot = await db.collection("groups").doc(groupId).get();
    const data = snapshot.data();

    const memberList = data.memberList;
    memberList.forEach((value) => {
      if (value.id === uid) {
        value.name = name;
      }
    });
    const updateData = {
      memberList: memberList,
      groupName: "tesuto",
    };
    console.log(memberList);

    dispatch(
      groupInAction({
        groupId: data.groupId,
        groupPassword: data.groupPassword,
        groupName: data.groupName,
        memberList: memberList,
        groupIcon: data.groupIcon,
      })
    );

    db.collection("groups")
      .doc(groupId)
      .set(updateData, { merge: true })
      .then(() => {
        dispatch(changeShiftName(groupId, name, uid));
      });
  };
};

export const changeGroupName = (groupId, newGroupName, password) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await db.collection("groups").doc(groupId).get();
    const data = snapshot.data();

    if (data.groupPassword !== password) {
      alert("パスワードが違います");
      return false;
    }

    const updateData = {
      groupName: newGroupName,
      updated_at: timestamp,
    };

    dispatch(
      groupInAction({
        groupId: data.groupId,
        groupPassword: data.groupPassword,
        groupName: newGroupName,
        memberList: data.memberList,
        groupIcon: data.groupIcon,
      })
    );

    db.collection("groups")
      .doc(groupId)
      .set(updateData, { merge: true })
      .then(() => {
        console.log("kokokm");
      });
  };
};

// export const changeGroupName = (groupId, groupName, managePassword) => {
//   // const timestamp = FirebaseTimestamp.now()
//   return async (dispatch) => {
//     const snapshot = await db.collection("groupId").doc(groupId).get();
//     const data = snapshot.data()
//     if (data.groupPassword !== managePassword) {
//       alert ("管理者パスワードが違います");
//       return false;
//     }
//     const updateData = {
//       groupName: groupName,
//       // updated_at: timestamp
//     }
//     dispatch(groupInAction({
//       groupId: data.groupId,
//       groupPassword: data.groupPassword,
//       groupName: groupName,
//       memberList: data.memberList,
//     }))

//     const doc = await db.collection("groups").doc(groupId).set(updateData, {merge: true})
//       // .then(() => {
//         alert ("変更しました")
//       // })
//   }
// }

export const groupIn = (groupId) => {
  const id = String(groupId);
  return async (dispatch) => {
    const snapshots = await db
      .collection("groups")
      .where("groupId", "==", id)
      .get();
    snapshots.forEach((doc) => {
      const data = doc.data();
      const memberList = data.memberList;

      dispatch(
        groupInAction({
          groupId: data.groupId,
          groupPassword: data.groupPassword,
          groupName: data.groupName,
          memberList: memberList,
          groupIcon: data.groupIcon,
        })
      );
    });
  };
};
