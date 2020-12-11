import React, {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import { Divider } from '@material-ui/core'
import { TextInput, PrimaryButton } from '../components/UIkit/index'
import {createGroup} from '../reducks/groups/operations';
import {signUp} from '../reducks/users/operations';

const CreateGroupPage = () => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState(''),
    [groupId, setGroupId] = useState(''),
    [groupPassword, setGroupPassword] = useState('');

  const inputGroupName = useCallback((event) => {
    setGroupName(event.target.value);
  }, [setGroupName])
  const inputGroupId = useCallback((event) => {
    setGroupId(event.target.value);
  }, [setGroupId])
  const inputGroupPassword = useCallback((event) => {
    setGroupPassword(event.target.value);
  }, [setGroupPassword])

  return (
    <div className="main-container"> 
      <h2>グループ作成</h2>
      <TextInput label={"グループ名"} type={"text"} fullWidth={true} value={groupName} onChange={inputGroupName} />
      <Divider />
      <TextInput label={"グループID"} type={"text"} fullWidth={true} value={groupId} onChange={inputGroupId} />
      <Divider />
      <TextInput label={"管理者パスワード"} type={"password"} fullWidth={true} value={groupPassword} onChange={inputGroupPassword} />
      <PrimaryButton onClick={() => dispatch(createGroup(groupName, groupId, groupPassword, "1234"))} label={"登録"} fullWidth={true}/>
    </div>
  )
}

export default CreateGroupPage
