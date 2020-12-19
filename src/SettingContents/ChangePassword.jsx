import React, { useCallback, useState } from "react";
import { resetPassword } from "../reducks/users/operations";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch } from "react-redux";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <>
      <div className="content-form">
        <TextInput
          id="reset-email"
          label={"メールアドレス"}
          onChange={inputEmail}
          type={"email"}
          value={email}
        />
      </div>
      <div className="content-button">
        <PrimaryButton
          label={"変更メールを送る"}
          onClick={() => dispatch(resetPassword(email))}
        />
      </div>
    </>
  );
};

export default ChangePassword;
