import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import { TextInput, PrimaryButton } from "../components/UIkit/index";
import { createGroup } from "../reducks/groups/operations";
import { getUserName, getUserId } from "../reducks/users/selectors";
import { push } from "connected-react-router";

const CreateGroupPage = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const username = getUserName(selector);
  const uid = getUserId(selector);

  const [groupName, setGroupName] = useState(""),
    [groupId, setGroupId] = useState(""),
    [groupPassword, setGroupPassword] = useState("");

  const inputGroupName = useCallback(
    (event) => {
      setGroupName(event.target.value);
    },
    [setGroupName]
  );
  const inputGroupId = useCallback(
    (event) => {
      setGroupId(event.target.value);
    },
    [setGroupId]
  );
  const inputGroupPassword = useCallback(
    (event) => {
      setGroupPassword(event.target.value);
    },
    [setGroupPassword]
  );

  return (
    <div className="main-container">
      <h2>グループ作成</h2>
      <TextInput
        label={"グループ名"}
        type={"text"}
        fullWidth={true}
        value={groupName}
        onChange={inputGroupName}
      />
      <TextInput
        label={"グループID"}
        type={"text"}
        fullWidth={true}
        value={groupId}
        onChange={inputGroupId}
      />
      <TextInput
        label={"管理者パスワード"}
        type={"password"}
        fullWidth={true}
        value={groupPassword}
        onChange={inputGroupPassword}
      />
      <PrimaryButton
        onClick={() =>
          dispatch(
            createGroup(groupName, groupId, groupPassword, username, uid)
          )
        }
        label={"登録"}
        fullWidth={true}
        width={"70%"}
      />
      <div className="w-border" />
      <PrimaryButton
        label={"グループに参加"}
        width={"50%"}
        fullWidth={true}
        onClick={() => dispatch(push("/enter"))}
      />
    </div>
  );
};

export default CreateGroupPage;
