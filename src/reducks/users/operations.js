import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import { push } from "connected-react-router";
import {signInAction, signOutAction} from './actions';
import {groupIn} from '../groups/operations';
import {fetchShifts} from '../groups/operations';
import { getGroupId } from "./selectors";

const usersRef = db.collection("users");
const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;

export const listenAuthState = () => {
  const startDate = d.getDate() + ((14 - d.getDay() + 1));
  const firstDate = new Date(y, m - 1, startDate);
  const dateId = `${firstDate.getFullYear()}${firstDate.getMonth()}${firstDate.getDate()}`;
  return async (dispatch) => {
    return auth.onAuthStateChanged( async (user) => {
      console.log("tesuto")
      if (user) {
        const uid = user.uid;

        const doc = await usersRef.doc(uid).get()
            const data = doc.data();
            const groupId = data.groupId;

            dispatch(
              signInAction({
                isSignIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
                groupId: groupId,
              })
            )
            if (groupId !== "") {
              dispatch(fetchShifts(groupId, dateId))
              dispatch(groupIn(groupId))
            } else {
              dispatch(push("/enter"))
            }
      } else {
        dispatch(push("/signin"));
      }
    })
  }
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
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
                isSignIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
                updated_at: timestamp,
                groupId: data.groupId,
              })
            );

            dispatch(push("/"));
            console.log("test-ol")
          })
          .catch(() => {
            alert("メールアドレスとパスワードが一致しません");
            console.log(Error);
          });
      }
    });

  }
}

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
      .then( async (result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username,
            groupId: "",
          };

          const snapshot = await usersRef.doc(uid).set(userInitialData);

          dispatch(push("/enter"));
        }
      });
  }
}

export const saveGroupId = (groupId, uid) => {
  const timestamp = FirebaseTimestamp.now();
  return async (dispatch) => {
    const data = {
      groupId: groupId
    }

    dispatch(
      signInAction({
        isSignIn: true,
        role: data.role,
        uid: uid,
        username: data.username,
        groupId: groupId,
      })
    );
    const setData = await db.collection("users").doc(uid).set(data, {merge: true});

    alert ("保存しました");
    dispatch(push("/"));
  }
}

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/enter"));
    });
  };
};