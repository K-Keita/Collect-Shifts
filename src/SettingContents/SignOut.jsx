import React from "react";
import { PrimaryButton } from "../components/UIkit";
import { signOut } from "../reducks/users/operations";
import { useDispatch } from "react-redux";

const SignOut = () => {
  const dispatch = useDispatch();

  return (
    <div className="content-button">
      <PrimaryButton
        fullWidth={false}
        label={"ログアウト"}
        onClick={() => dispatch(signOut())}
      />
    </div>
  );
};

export default SignOut;
