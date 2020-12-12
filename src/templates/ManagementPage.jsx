import React, {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux';
import { PrimaryButton, TextInput } from '../components/UIkit';
import {ToggleContent} from '../components/index';
import {ChangeGroupName, ChangeName, ChangePassword, RegistManage} from "../components/MinComponents"

const ManagementPage = () => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState(''),
    [newId, setNewId] = useState('');

  const changeName = 
  <>
    <ChangeName />
  </>

  const changePassword =    <>
  <ChangePassword />
  </>

  const registManagement =
  <>
   <RegistManage />
  </>
  
  const changeGroupName = 
  <>
  <ChangeGroupName />
  </>

  const exitGroup = <>
        <div className="content-button">
        <PrimaryButton label={"退会する"} />
        </div>
  </>

return (
  <>
    <ToggleContent label={"管理者登録"} content={registManagement} />
    <div className="w-border" />
    <ToggleContent label={"名前の変更"} content={changeName} />
    <div className="w-border" />
    <ToggleContent label={"パスワードの変更"} content={changePassword} />
    <div className="w-border" />
    <ToggleContent label={"グループ名変更"} content={changeGroupName} />
    <div className="w-border" />
    <ToggleContent label={"グループを退会"} content={exitGroup} />
  </>
  )
}

export default ManagementPage
