import React, {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux';
import { Divider } from '@material-ui/core'
import { ShiftTable } from '../components'
import { PrimaryButton, TextInput } from '../components/UIkit';
import {enterGroup} from '../reducks/groups/operations';

const ManagementPage = () => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState(''),
    [newId, setNewId] = useState('');

  const inputNewName = useCallback((event) => {
    setNewName(event.target.value)
  }, [setNewName])

  const inputNewId = useCallback((event) => {
    setNewId(event.target.value)
  }, [setNewId])

  return (
    <div className="setting">
      <h2>パスワード変更</h2>
      <Divider />
      <h2></h2>
      <h2>管理者登録</h2>
      <Divider />
      <h2>グループ名変更</h2>
      <Divider />
      <h2>グループID変更</h2>
      <Divider />
      <h2>メンバー追加</h2>
      <TextInput onChange={inputNewName} label={"名前"} type={"text"} fullWidth={false} value={newName} />
      <TextInput onChange={inputNewId} label={"ID"} type={"text"} fullWidth={false} value={newId} /> 
      <PrimaryButton onClick={() => dispatch(enterGroup('12345678', newName, newId))} label={"追加"} fullWidth={false} />
      <h2>退会</h2>
    </div>
  )
}

export default ManagementPage
