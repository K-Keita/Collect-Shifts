import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import { push } from "connected-react-router";
import { signInAction, signOutAction } from "./actions";
import { groupIn } from "../groups/operations";
import { fetchShifts } from "../groups/operations";
import { changeMemberName } from "../groups/operations";
import { groupOutAction } from "../groups/actions";

const usersRef = db.collection("users");
const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;
const sun = d.getDay() === 0 ? 7 : d.getDay();
const s = d.getDate() + (14 - sun + 1);
const firstDate = new Date(y, m - 1, s);
const dateId = `${firstDate.getFullYear()}${firstDate.getMonth()}${firstDate.getDate()}`;

//グループIDの削除
export const deleteGroupId = (uid, groupId) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await db.collection("users").doc(uid).get();
    const data = snapshot.data();

    if (data.groupId !== groupId) {
      return false;
    }

    const updateData = {
      groupId: "",
      updated_at: timestamp,
    };

    const setData = await db
      .collection("users")
      .doc(uid)
      .set(updateData, { merge: true });

    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/top"));
    });
  };
};

//ログイン情報の取得
export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;

        const doc = await usersRef.doc(uid).get();
        const data = doc.data();
        const groupId = data.groupId;

        dispatch(
          signInAction({
            groupId: groupId,
            role: data.role,
            isSignIn: true,
            uid: uid,
            username: data.username,
          })
        );

        if (groupId === "") {
          dispatch(push("/enter"));
        } else {
          dispatch(fetchShifts(groupId, dateId));
          dispatch(groupIn(groupId));
        }
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

//ユーザー名の変更
export const changeName = (name, uid, groupId) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await db.collection("users").doc(uid).get();
    const data = snapshot.data();

    const updateData = {
      username: name,
      updated_at: timestamp,
    };
    dispatch(
      signInAction({
        groupId: data.groupId,
        isSignIn: true,
        role: data.role,
        uid: uid,
        username: name,
      })
    );

    db.collection("users")
      .doc(uid)
      .set(updateData, { merge: true })
      .then(() => {
        dispatch(changeMemberName(name, uid, groupId));
      });
  };
};

//サインイン
export const signIn = (email, password) => {
  return async (dispatch) => {
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        usersRef
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                groupId: data.groupId,
                isSignIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );

            if (data.groupId === "") {
              dispatch(push("/enter"));
            } else {
              dispatch(push("/"));
            }
          })
          .catch(() => {
            alert("メールアドレスとパスワードが一致しません");
            console.log(Error);
          });
      }
    });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    // if (email === "") {
    //   alert("必須項目が未入力です");
    //   return false;
    // } else if (!isValidEmailFormat(email)) {
    //   alert("メールアドレスの形式が不正です。");
    //   return false;
    // }
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(
          "入力されたアドレスにパスワードリセット用のメールをお送りしました。"
        );
        dispatch(push("/signin"));
      })
      .catch(() => {
        alert("パスワードリセットに失敗しました。通信状況をご確認ください");
      });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です");
      return false;
    }

    // if (!isValidEmailFormat(email)) {
    //   alert("メールアドレスの形式が不正です。もう1度お試しください。");
    //   return false;
    // }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試しください");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            groupId: "",
            role: "customer",
            updated_at: timestamp,
            username: username,
            uid: uid,
          };

          const setData = await usersRef.doc(uid).set(userInitialData);

          dispatch(push("/enter"));
        }
      });
  };
};

//グループIDの登録
export const saveGroupId = (groupId, uid, username) => {
  // const timestamp = FirebaseTimestamp.now();
  return async (dispatch) => {
    const data = {
      groupId: groupId,
    };

    dispatch(
      signInAction({
        groupId: groupId,
        isSignIn: true,
        role: data.role,
        uid: uid,
        username: username,
      })
    );

    db.collection("users")
      .doc(uid)
      .set(data, { merge: true })
      .then(() => {
        alert("グループに加入しました");
        dispatch(push("/"));
      });
  };
};

//サインアウト
export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(groupOutAction());
      dispatch(push("/top"));
    });
  };
};
