import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getUserId} from '../reducks/users/selectors';
import { PrimaryButton, TextInput } from '../components/UIkit';
import {ToggleContent} from '../components/index';
import {changeName} from '../reducks/users/operations';
import { getGroupId} from '../reducks/groups/selectors';
import {getUserName} from '../reducks/users/selectors';

const ChangeName = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const [password, setPassword] = useState(""),
    [newName, setNewName] = useState("");

  const uid = getUserId(selector);
  const groupId = getGroupId(selector);
  const username = getUserName(selector);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);
  
  const inputNewName = useCallback((event) => {
    setNewName(event.target.value);
  }, [setNewName]);

  return (
    <>
    <div className="content-form">
      {/* <p style={{margin: "0 12px"}}>名前：{username}</p> */}
      <TextInput label={"新しい名前"} type={"text"} value={newName} onChange={inputNewName} />
      </div>
      <div className="content-button">
      <PrimaryButton label={"変更する"} onClick={() => dispatch(changeName(newName, uid, groupId))} />
      </div>
    </>
  )
}

export default ChangeName
