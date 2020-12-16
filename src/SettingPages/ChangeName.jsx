import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getUserId} from '../reducks/users/selectors';
import { PrimaryButton, TextInput } from '../components/UIkit';
import {changeName} from '../reducks/users/operations';
import { getGroupId} from '../reducks/groups/selectors';

const ChangeName = React.memo(() => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const [newName, setNewName] = useState("");

  const uid = getUserId(selector);
  const groupId = getGroupId(selector);
  
  const inputNewName = useCallback((event) => {
    setNewName(event.target.value);
  }, [setNewName]);

  return (
    <>
    <div className="content-form">
      <TextInput label={"新しい名前"} id="change-name" type={"text"} value={newName} onChange={inputNewName} />
      </div>
      <div className="content-button">
      <PrimaryButton label={"変更する"} onClick={() => dispatch(changeName(newName, uid, groupId))} />
      </div>
    </>
  )
})

export default ChangeName
