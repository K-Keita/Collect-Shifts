import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ImageArea } from "../components/index";
import { saveGroupIcon } from "../reducks/groups/operations";
import { PrimaryButton, TextInput } from "../components/UIkit/index";
import { getGroupIcon, getGroupId } from "../reducks/groups/selectors";

const SaveGroupIcon = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const groupId = getGroupId(selector);
  const groupIcon = getGroupIcon(selector);

  const [password, setPassword] = useState("");
  const [images, setImages] = useState("");

  useEffect(() => {
    setImages(groupIcon);
  }, [groupIcon]);

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <>
      <div className="content-form">
        <TextInput
          label={"管理者パスワード"}
          type={"password"}
          onChange={inputPassword}
        />
        <ImageArea images={images} setImages={setImages} />
      </div>
      <div className="content-button">
        <PrimaryButton
          label={"登録"}
          onClick={() => dispatch(saveGroupIcon(images, groupId, password))}
        />
      </div>
    </>
  );
};

export default SaveGroupIcon;
