import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Divider } from '@material-ui/core'
import { TextInput, PrimaryButton } from '../components/UIkit/index'
import {createGroup} from '../reducks/groups/operations';
import {signUp} from '../reducks/users/operations';
import { SettingsBackupRestoreOutlined } from '@material-ui/icons';
import {enterGroup} from '../reducks/groups/operations';
import { getUserName, getUserId } from '../reducks/users/selectors';

const EnterGroupPage = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const username = getUserName(selector);
  const uid = getUserId(selector);
  const [groupName, setGroupName] = useState(''),
    [groupId, setGroupId] = useState('');

  const inputGroupName = useCallback((event) => {
    setGroupName(event.target.value);
  }, [setGroupName])
  const inputGroupId = useCallback((event) => {
    setGroupId(event.target.value);
  }, [setGroupId])

  return (
    <div className="main-container">
      <h2>グループに入る</h2>
      <TextInput label={"グループ名"} type={"text"} fullWidth={true} onChange={inputGroupName} value={groupName} />
      <TextInput label={"グループID"} type={"text"} fullWidth={true} onChange={inputGroupId} value={groupId} />
      <PrimaryButton label={"サインイン"} fullWidth={true} onClick={() => dispatch(enterGroup(groupName, groupId, username, uid))} />
    </div>
  )
}

export default EnterGroupPage
