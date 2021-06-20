import React, { useCallback, useState } from "react";
import topImage from "../images/topImage.jpg";
import { PrimaryButton, TextInput } from "../components/UIkit/index";
import { push } from "connected-react-router";
import { signUp } from "../reducks/users/operations";
import { useDispatch } from "react-redux";

const CreateGroupPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <div className="main-container">
      {/* <div>
        <img src={topImage} alt="maintitle" className="image-box_a" />
      </div> */}
      <h2>アカウント登録</h2>
      <TextInput
        fullWidth={true}
        label={"ユーザー名"}
        onChange={inputUsername}
        type={"text"}
        value={username}
      />
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        onChange={inputEmail}
        type={"email"}
        value={email}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード(6文字以上)"}
        onChange={inputPassword}
        type={"password"}
        value={password}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード(確認用)"}
        onChange={inputConfirmPassword}
        type={"password"}
        value={confirmPassword}
      />
      <div className="medium-space" />
      <PrimaryButton
        fullWidth={true}
        label={"登録"}
        onClick={() =>
          dispatch(signUp(username, email, password, confirmPassword))
        }
        width={"70%"}
      />
      <div className="w-border" />
      <PrimaryButton
        fullWidth={true}
        label={"アカウントをお持ちの方"}
        onClick={() => dispatch(push("/signin"))}
        width={"55%"}
      />
    </div>
  );
};

export default CreateGroupPage;
