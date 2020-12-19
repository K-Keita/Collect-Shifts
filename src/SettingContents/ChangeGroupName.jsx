import React, { useCallback, useState } from "react";
import { changeGroupName } from "../reducks/groups/operations";
import { getGroupId } from "../reducks/groups/selectors";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";

const ChangeGroupName = React.memo(() => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const groupId = getGroupId(selector);

  const [groupPassword, setGroupPassword] = useState(""),
    [newGroupName, setNewGroupName] = useState("");

  const inputPassword = useCallback(
    (event) => {
      setGroupPassword(event.target.value);
    },
    [setGroupPassword]
  );

  const inputNewGroupName = useCallback(
    (event) => {
      setNewGroupName(event.target.value);
    },
    [setNewGroupName]
  );

  return (
    <>
      <div className="content-form">
        <TextInput
          id="manage-password"
          label={"管理者パスワード"}
          onChange={inputPassword}
          type={"password"}
          value={GroupPassword}
        />
        <TextInput
          id="new-group"
          label={"新しいグループ名"}
          onChange={inputNewGroupName}
          type={"text"}
          value={newGroupName}
        />
      </div>
      <div className="content-button">
        <PrimaryButton
          label={"変更する"}
          onClick={() =>
            dispatch(changeGroupName(groupId, newGroupName, groupPassword))
          }
        />
      </div>
    </>
  );
});

export default ChangeGroupName;
