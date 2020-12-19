import React, { useCallback, useState } from "react";
import { getGroupId } from "../reducks/groups/selectors";
import { getUserId } from "../reducks/users/selectors";
import { registManage } from "../reducks/groups/operations";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";

const RegistManage = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const groupId = getGroupId(selector),
    uid = getUserId(selector);

  const [groupPassword, setGroupPassword] = useState("");

  const inputgroupPassword = useCallback(
    (event) => {
      setGroupPassword(event.target.value);
    },
    [setGroupPassword]
  );

  return (
    <>
      <div className="content-form">
        <TextInput
          id="password"
          label={"管理者パスワード"}
          onChange={inputgroupPassword}
          type={"text"}
          value={groupPassword}
        />
      </div>
      <div className="content-button">
        <PrimaryButton
          label={"登録する"}
          onClick={() => dispatch(registManage(groupId, groupPassword, uid))}
        />
      </div>
    </>
  );
};

export default RegistManage;
