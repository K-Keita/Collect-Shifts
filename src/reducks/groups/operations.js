import { db, FirebaseTimestamp } from "../../firebase/index";
import {
  groupInAction,
  groupOutAction,
} from "../groups/actions";
import { saveGroupId, deleteGroupId } from "../users/operations";
import { push } from "connected-react-router";
import {fetchShifts, deleteShift, changeShiftName} from "../shifts/operations"

const groupsRef = db.collection("groups");

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;
const sun = d.getDay() === 0 ? 7 : d.getDay();
const s = d.getDate() + (14 - sun + 1);
const firstDate = new Date(y, m - 1, s);
const dateId = `${firstDate.getFullYear()}${firstDate.getMonth()}${firstDate.getDate()}`;

//グループ名の変更
export const changeGroupName = (groupId, groupPassword, newGroupName) => {
  return async (dispatch) => {
    if (groupPassword === "" || newGroupName === "") {
      alert ("必須項目が未入力です")
      return false;
    }
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await groupsRef.doc(groupId).get();
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

    groupsRef
      .doc(groupId)
      .set(updateData, { merge: true })
      .then(() => {
        alert("変更しました");
      }).catch((error) => {
        throw new Error(error);
      })
  };
};

//メンバーの名前変更
export const changeMemberName = (groupId, uid, username) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await groupsRef.doc(groupId).get();
    const data = snapshot.data();

    const groupMembers = data.groupMembers;
    groupMembers.forEach((value) => {
      if (value.id === uid) {
        value.name = username;
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

    groupsRef
      .doc(groupId)
      .set(updateData, { merge: true })
      .then(() => {
        dispatch(changeShiftName(groupId, uid, username));
      }).catch((error) => {
        throw new Error(error);
      })
  };
};

//グループの作成
export const createGroup = (
  groupId,
  groupName,
  groupPassword,
  uid,
  username,
) => {
  return async (dispatch) => {
    if (username === "" || uid === "") {
      alert("アカウントが必要です");
      dispatch(push("/signup"));
      return false;
    }
    if (groupId === "" || groupName === "" || groupPassword === "") {
      alert("必須項目が未入力です。");
      return false;
    }
    if ((await groupsRef.doc(groupId).get()).exists) {
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

    groupsRef
      .doc(groupId)
      .set(initializeDate)
      .then(() => {
        dispatch(saveGroupId(groupId, uid, username));
        dispatch(fetchShifts(dateId, groupId))
        dispatch(push("/"));
      }).catch((error) => {
        throw new Error(error);
      })
  };
};

//グループに参加
export const enterGroup = (groupId, groupName, uid, username) => {
  return async (dispatch) => {
    if (groupId === "" || groupName === "") {
      alert ("必須項目が未入力です")
      return false;
    }
    const snapshot = await groupsRef.doc(groupId).get();

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

    groupsRef
    .doc(groupId)
    .set(newData, { merge: true })
    .then(() => {
        dispatch(fetchShifts(dateId, groupId)); 
        dispatch(saveGroupId(groupId, uid, username));
      }).catch((error) => {
        throw new Error(error);
      })
  };
};

//グループの退会
export const exitGroup = (groupId, uid, username) => {
  return async (dispatch) => {
    if (
      !window.confirm(
        "このグループを退会します。本当によろしいですか？(退会すると自動でログアウトされます）"
      )
    ) {
      return false;
    }
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await groupsRef.doc(groupId).get();

    const data = snapshot.data();
    const groupMembers = data.groupMembers;

    const updateMember = [];
    groupMembers.map((value) => {
      if (value.name === username && value.id === uid) {
        return false;
      }
      return updateMember.push(value);
    });
    const updateData = {
      groupMembers: updateMember,
      updated_at: timestamp,
    };
    dispatch(groupOutAction());

    groupsRef
      .doc(groupId)
      .set(updateData, { merge: true })
      .then(() => {
        dispatch(deleteShift(groupId, username));
        dispatch(deleteGroupId(groupId, uid));
      }).catch((error) => {
        throw new Error(error);
      })
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
        alert("グループ情報が取得できません");
        dispatch(push("/enter"))
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

//管理者登録
export const registManage = (groupId, groupPassword, uid) => {
  return async (dispatch) => {
    if (groupPassword === "") {
      alert ("必須項目が未入力です");
      return false;
    }
    const snapshot = await groupsRef.doc(groupId).get();
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
    groupsRef
      .doc(groupId)
      .set(updateData, { merge: true })
      .then(() => {
        alert("管理者登録しました");
      }).catch((error) => {
        throw new Error(error);
      })
  };
};

//グループのアイコンの登録
export const saveGroupIcon = (groupId, groupPassword, images) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await groupsRef.doc(groupId).get();
    const data = snapshot.data();
    if (data.groupPassword !== groupPassword) {
      alert("パスワードが違います");
      return false;
    }

    const updateData = {
      groupIcon: images,
      updated_at: timestamp,
    };
    dispatch(
      groupInAction({
        groupIcon: images,
        groupId: groupId,
        groupName: data.groupName,
        groupPassword: data.groupPassword,
        groupMembers: data.groupMembers,
      })
    );

    groupsRef
      .doc(groupId)
      .set(updateData, { merge: true })
      .then(() => {
        alert("アイコンを変更しました");
      }).catch((error) => {
        throw new Error(error);
      })
  };
};