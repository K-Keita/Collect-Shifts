import React, {useCallback, useState} from 'react'
import { PrimaryButton, TextInput } from '../components/UIkit';
import {ToggleContent} from '../components/index';

const ChangeGroupName = () => {
  const [groupName, setGroupName] = useState(""),
    [newGroupName, setNewGroupName] = useState("");

  const inputGroupName = useCallback((event) => {
    setGroupName(event.target.value);
  }, [setGroupName])
  const inputNewGroupName = useCallback((event) => {
    setNewGroupName(event.target.value);
  }, [setNewGroupName])


  return (
    <>
    <div className="content-form">
    <TextInput label={"管理者パスワード"} type={"password"} value={groupName} onChange={inputGroupName} />
    <TextInput label={"新しいグループ名"} type={"password"} value={newGroupName} onChange={inputNewGroupName} />
    </div>
    <div className="content-button">
    <PrimaryButton label={"変更する"}  />
    </div>
    </>
  )
}

export default ChangeGroupName
