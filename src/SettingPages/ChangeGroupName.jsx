import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { PrimaryButton, TextInput } from '../components/UIkit';
import {ToggleContent} from '../components/index';
import {getUserId} from '../reducks/users/selectors';
import { changeGroupName } from '../reducks/groups/operations';
import { getGroupId, getGroupName } from '../reducks/groups/selectors';


const ChangeGroupName = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const uid = getUserId(selector);
  const groupName = getGroupName(selector);
  const groupId = getGroupId(selector)
  const [password, setPassword] = useState(""),
    [newGroupName, setNewGroupName] = useState("");

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword])
  const inputNewGroupName = useCallback((event) => {
    setNewGroupName(event.target.value);
  }, [setNewGroupName])


  return (
    <>
    <div className="content-form">
  {/* <p style={{margin: "0"}}>グループ名：{groupName}</p> */}
    <TextInput label={"管理者パスワード"} type={"password"} value={password} onChange={inputPassword} />
    <TextInput label={"新しいグループ名"} type={"text"} value={newGroupName} onChange={inputNewGroupName} />
    </div>
    <div className="content-button">
    <PrimaryButton label={"変更する"} onClick={() => dispatch(changeGroupName(groupId, newGroupName, password))} />
    </div>
    </>
  )
}

export default ChangeGroupName;
