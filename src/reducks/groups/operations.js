import { db, FirebaseTimestamp } from "../../firebase/index";
import {
  fetchShiftsListAction,
  groupInAction,
  groupOutAction,
} from "../groups/actions";
import { saveGroupId, deleteGroupId, signOut } from "../users/operations";
import { push } from "connected-react-router";

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;
const sun = d.getDay() === 0 ? 7 : d.getDay();
const s = d.getDate() + (14 - sun + 1);
const firstDate = new Date(y, m - 1, s);
const prevFirstDate = new Date(y, m - 1, s - 7);
const dateId = `${firstDate.getFullYear()}${firstDate.getMonth()}${firstDate.getDate()}`;
const prevDateId = `${prevFirstDate.getFullYear()}${prevFirstDate.getMonth()}${prevFirstDate.getDate()}`;

//グループのアイコンの登録
export const saveGroupIcon = (images, groupId, groupPassword) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await db.collection("groups").doc(groupId).get();
    const data = snapshot.data();
    if (data.groupPassword !== groupPassword) {
      alert("パスワードが違います");
      return false;
    }

    const updateData = {
      groupIcon: images,
      updated_at: timestamp,
    };

    db.collection("groups")
      .doc(groupId)
      .set(updateData, { merge: true })
      .then(() => {
        dispatch(
          groupInAction({
            groupIcon: images,
            groupId: groupId,
            groupName: data.groupName,
            groupPassword: data.groupPassword,
            groupMembers: data.groupMembers,
          })
        );
        alert("アイコンを変更しました");
      });
  };
};

//グループの作成
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
    const groupMembers = {
      manage: true,
      name: username,
      id: uid,
    };

    const initializeDate = {
      created_at: timestamp,
      groupName: groupName,
      groupId: groupId,
      groupIcon: "",
      groupPassword: groupPassword,
      groupMembers: [groupMembers],
      updated_at: timestamp,
    };

    dispatch(
      groupInAction({
        groupName: groupName,
        groupIcon: "",
        groupId: groupId,
        groupPassword: groupPassword,
        groupMembers: [groupMembers],
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

// シフトの削除
export const deleteShift = (groupId, username) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
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
      updated_at: timestamp,
    };

    db.collection("groups")
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .set(updateData, { merge: true })
      .then(() => {
        console.log("delete-ok");
      });
  };
};

//グループの退会
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
    const groupMembers = data.groupMembers;

    const updateList = [];
    groupMembers.map((value) => {
      if (value.name === username && value.id === uid) {
        return false;
      }
      return updateList.push(value);
    });
    const updateData = {
      groupMembers: updateList,
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

//グループに参加
export const enterGroup = (groupName, groupId, username, uid) => {
  return async (dispatch) => {
    const snapshot = await db.collection("groups").doc(groupId).get();

    if (!snapshot.exists) {
      alert("グループが存在しません");
      return false;
    }

    const data = snapshot.data();
    if (data.groupName !== groupName) {
      alert("グループ名とIDが一致しません");
      return false;
    }

    const groupMembers = data.groupMembers;
    const newMember = {
      manage: false,
      name: username,
      id: uid,
    };
    groupMembers.push(newMember);

    const newData = {
      groupMembers: groupMembers,
    };

    dispatch(
      groupInAction({
        groupId: groupId,
        groupIcon: data.groupIcon,
        groupName: data.groupName,
        groupPassword: data.groupPassword,
        groupMembers: groupMembers,
      })
    );

    dispatch(fetchShifts(groupId, dateId));

    db.collection("groups")
      .doc(groupId)
      .set(newData, { merge: true })
      .then(() => {
        dispatch(saveGroupId(groupId, uid, username));
      });
  };
};

//シフトリストの呼び出し
export const fetchShifts = (groupId, dateId) => {
  const timestamp = FirebaseTimestamp.now();
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

      const data = {
        created_at: timestamp,
        prevShiftList: prevShiftData,
        shiftList: [],
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
              prevShiftList: prevShiftData,
              shiftList: [],
            })
          );
        });
    } else {
      const data = snapshot.data();

      dispatch(
        fetchShiftsListAction({
          prevShiftList: data.prevShiftList,
          shiftList: data.shiftList,
        })
      );
    }
  };
};

//シフト登録
export const saveShifts = (groupId, shift, name, uid) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await db
      .collection("groups")
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .get();
    const newData = {
      list: shift,
      name: name,
      id: uid,
    };

    if (snapshot.exists) {
      const data = snapshot.data();
      const shiftList = data.shiftList;

      const arr = [];
      shiftList.map((value) => {
        return arr.push(value.name);
      });
      const i = arr.indexOf(newData.name);
      if (i !== -1) {
        if (!window.confirm("既に登録されていますが、変更しますか？")) {
          return false;
        }
        shiftList[i] = newData;
      } else {
        shiftList.push(newData);
      }

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
              prevShiftList: data.prevShiftList,
              shiftList: shiftList,
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
        const data = prevSnapshot.data();
        const prevShiftData = data.prevShiftList;
        prevShiftData.push(data);
      }

      const initializeDate = {
        created_at: timestamp,
        prevShiftList: prevShiftData,
        shiftList: [newData],
        updated_at: timestamp,
      };

      db.collection("groups")
        .doc(groupId)
        .collection("shiftsList")
        .doc(dateId)
        .set(initializeDate)
        .then(() => {
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

//シフトに登録した名前の変更
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
      prevShiftList: prevShiftList,
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
            prevShiftList: prevShiftList,
          })
        );
        alert("変更しました");
      });
  };
};

//管理者登録
export const registManage = (groupPassword, uid, groupId) => {
  return async (dispatch) => {
    const snapshot = await db.collection("groups").doc(groupId).get();
    const data = snapshot.data();
    if (data.groupPassword !== groupPassword) {
      alert("管理者パスワードが違います");
      return false;
    }

    const groupMembers = data.groupMembers;
    groupMembers.forEach((value) => {
      if (value.id === uid) {
        value.manage = true;
      }
    });

    const updateData = {
      groupMembers: groupMembers,
    };
    dispatch(
      groupInAction({
        groupId: data.groupId,
        groupIcon: data.groupIcon,
        groupName: data.groupName,
        groupPassword: data.groupPassword,
        groupMembers: groupMembers,
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

//メンバーの名前変更
export const changeMemberName = (name, uid, groupId) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await db.collection("groups").doc(groupId).get();
    const data = snapshot.data();

    const groupMembers = data.groupMembers;
    groupMembers.forEach((value) => {
      if (value.id === uid) {
        value.name = name;
      }
    });

    const updateData = {
      groupMembers: groupMembers,
      updated_at: timestamp,
    };

    dispatch(
      groupInAction({
        groupIcon: data.groupIcon,
        groupId: data.groupId,
        groupName: data.groupName,
        groupPassword: data.groupPassword,
        groupMembers: groupMembers,
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

//グループ名の変更
export const changeGroupName = (groupId, newGroupName, groupPassword) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await db.collection("groups").doc(groupId).get();
    const data = snapshot.data();

    if (data.groupPassword !== groupPassword) {
      alert("パスワードが違います");
      return false;
    }

    const updateData = {
      groupName: newGroupName,
      updated_at: timestamp,
    };

    dispatch(
      groupInAction({
        groupIcon: data.groupIcon,
        groupId: data.groupId,
        groupName: newGroupName,
        groupPassword: data.groupPassword,
        groupMembers: data.groupMembers,
      })
    );

    db.collection("groups")
      .doc(groupId)
      .set(updateData, { merge: true })
      .then(() => {
        alert("変更しました。");
      });
  };
};

//グループにサインイン
export const groupIn = (groupId) => {
  return async (dispatch) => {
    const snapshots = await db
      .collection("groups")
      .where("groupId", "==", groupId)
      .get();

    snapshots.forEach((doc) => {
      if (!doc.exists) {
        alert("グループ情報が取得できません。");
        return false;
      }
      const data = doc.data();

      dispatch(
        groupInAction({
          groupIcon: data.groupIcon,
          groupId: data.groupId,
          groupName: data.groupName,
          groupPassword: data.groupPassword,
          groupMembers: data.groupMembers,
        })
      );
    });
  };
};
