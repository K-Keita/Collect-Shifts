import React, {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux';
import { PrimaryButton, TextInput } from '../components/UIkit';
import {ToggleContent} from '../components/index';
import {ChangeGroupName, ChangeName, ChangePassword, ExitGroup, RegistManage} from '../SettingPages/index';
import { Divider } from '@material-ui/core';

const ManagementPage = () => {
  const changeName =  <ChangeName />

  // const changePassword = <ChangePassword />

  const registManagement = <RegistManage />
  
  const changeGroupName = <ChangeGroupName />

  const exitGroup = <ExitGroup />


  const contentArr = [
    {name: "名前の変更", content: changeName},
    {name: "グループ名の変更", content: changeGroupName},
    {name: "管理者登録", content: registManagement},
    {name: "グループを退会", content: exitGroup}
  ]

return (
  <>
    {contentArr.map((value, index) => {
      return (
        <div key={String(index)}>
        <ToggleContent label={value.name} content={value.content} />
        <div className="w-border" />
        </div>
      )
    })}
  </>
  )
}

export default ManagementPage
