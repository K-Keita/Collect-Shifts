import React from "react";
import { ToggleContent } from "../components/index";
import {
  ChangeGroupName,
  ChangeName,
  SaveGroupIcon,
  ExitGroup,
  RegistManage,
  SignOut,
} from "../SettingPages/index";

const ManagementPage = () => {
  const changeName = <ChangeName />;

  const registManagement = <RegistManage />;

  const saveGroupIcon = <SaveGroupIcon />;

  const changeGroupName = <ChangeGroupName />;

  const signout = <SignOut />;

  const exitGroup = <ExitGroup />;

  const contentArr = [
    { name: "名前の変更", content: changeName },
    { name: "グループ名の変更", content: changeGroupName },
    { name: "グループアイコンの変更", content: saveGroupIcon },
    { name: "管理者登録", content: registManagement },
    { name: "ログアウト", content: signout },
    { name: "グループを退会", content: exitGroup },
  ];

  return (
    <div className="main-container">
      <h3 className="sub-label">設定</h3>
      <div className="w-border" />
      {contentArr.map((value, index) => {
        return (
          <div key={String(index)}>
            <ToggleContent label={value.name} content={value.content} />
            <div className="w-border" />
          </div>
        );
      })}
    </div>
  );
};

export default ManagementPage;
