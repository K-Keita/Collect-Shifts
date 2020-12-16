import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UIkit/index";
import { signIn } from "../reducks/users/operations";
import { push } from "connected-react-router";

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
      <h2>サインイン</h2>
      <TextInput
        label={"email"}
        type={"email"}
        fullWidth={true}
        onChange={inputEmail}
        value={email}
      />
      <TextInput
        label={"パスワード"}
        type={"password"}
        fullWidth={true}
        onChange={inputPassword}
        value={password}
      />
      <PrimaryButton
        label={"サインイン"}
        width={"70%"}
        fullWidth={true}
        onClick={() => dispatch(signIn(email, password))}
      />
      <div className="w-border" />
      <PrimaryButton
        fullWidth={true}
        label="アカウント登録"
        width={"50%"}
        onClick={() => dispatch(push("/signup"))}
      />
      <div className="small-space" />
      <PrimaryButton
        fullWidth={true}
        label={"パスワードを忘れた方"}
        width={"50%"}
        onClick={() => dispatch(push("/reset"))}
      />
    </div>
  );
};

export default SignIn;
