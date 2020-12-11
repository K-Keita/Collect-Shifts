import React, {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux';
import { Divider } from '@material-ui/core';
import { ShiftTable } from '../components'
import { PrimaryButton, TextInput } from '../components/UIkit';
import {enterGroup} from '../reducks/groups/operations';
import {signOut} from '../reducks/users//operations';
import {makeStyles} from '@material-ui/core';
import blueGrey from '@material-ui/core/colors/blueGrey';


const useStyles = makeStyles({
  // divider: {
  //   borderTopColor: blueGrey[300],
  //   color: blueGrey[300]
  // }
});

const ManagementPage = () => {
  const classes = useStyles();
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
      <h2>管理者登録</h2>
      <Divider />
      <h2>グループ名変更</h2>
      <Divider />
      <h2>グループID変更</h2>
      <Divider />
      <h2>退会</h2>
      <Divider  />
      <div onClick={() => dispatch(signOut())}>
      <h2>ログアウト</h2>
      </div>
    </div>
  )
}

export default ManagementPage
