import React, { useCallback, useState } from "react";
import { changeName } from "../reducks/users/operations";
import { getGroupId } from "../reducks/groups/selectors";
import { getUserId } from "../reducks/users/selectors";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";

const ChangeName = React.memo(() => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const groupId = getGroupId(selector),
    uid = getUserId(selector);

  const [newName, setNewName] = useState("");

  const inputNewName = useCallback(
    (event) => {
      setNewName(event.target.value);
    },
    [setNewName]
  );

  return (
    <>
      <div className="content-form">
        <TextInput
          id="change-name"
          label={"新しい名前"}
          onChange={inputNewName}
          type={"text"}
          value={newName}
        />
      </div>
      <div className="content-button">
        <PrimaryButton
          label={"変更する"}
          onClick={() => dispatch(changeName(groupId, uid, newName))}
        />
      </div>
    </>
  );
});

export default ChangeName;
