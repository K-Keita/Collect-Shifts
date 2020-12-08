import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import { push } from "connected-react-router";

const usersRef = db.collection("users");

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
      .then((result) => {
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
          };

          usersRef
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              // dispatch(push("/"));
              console.log("ok")
            });
        }
      });
  }
}
