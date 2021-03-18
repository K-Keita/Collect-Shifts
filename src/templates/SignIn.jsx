import React, { useCallback, useState } from "react";
import topImage from "../images/topImage.jpg";
import { useDispatch } from "react-redux";
import { PrimaryButton, TextInput } from "../components/UIkit/index";
import { push } from "connected-react-router";
import { signIn } from "../reducks/users/operations";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

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

  return (
    <div className="main-container">
      <div>
        <img src={topImage} alt="maintitle" className="image-box_a" />
      </div>
      <h2>サインイン</h2>
      <TextInput
        fullWidth={true}
        label={"email"}
        onChange={inputEmail}
        type={"email"}
        value={email}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        onChange={inputPassword}
        type={"password"}
        value={password}
      />
      <PrimaryButton
        fullWidth={true}
        label={"サインイン"}
        onClick={() => dispatch(signIn(email, password))}
        width={"70%"}
      />
      <div className="w-border" />
      <PrimaryButton
        fullWidth={true}
        label="アカウント登録"
        onClick={() => dispatch(push("/signup"))}
        width={"50%"}
      />
      <div className="small-space" />
      <PrimaryButton
        fullWidth={true}
        label={"パスワードを忘れた方"}
        onClick={() => dispatch(push("/reset"))}
        width={"50%"}
      />
      {/* <div className="w-border medium-space" />
      <PrimaryButton
        fullWidth={true}
        label={"グループに参加"}
        onClick={() => dispatch(push("/enter"))}
        width={"50%"}
      />
      <div className="small-space" />
      <PrimaryButton
        fullWidth={true}
        label={"グループを作成"}
        onClick={() => dispatch(push("/create"))}
        width={"50%"}
      /> */}
    </div>
  );
};

export default SignIn;
