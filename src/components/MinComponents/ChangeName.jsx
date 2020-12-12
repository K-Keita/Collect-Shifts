import React, {useCallback, useState} from 'react'
import { PrimaryButton, TextInput } from '../components/UIkit';
import {ToggleContent} from '../components/index';

const ChangeName = () => {
  const [password, setPassword] = useState(""),
    [newName, setNewName] = useState("");

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);
  
  const inputNewName = useCallback((event) => {
    setNewName(event.target.value);
  }, [setNewName]);

  return (
    <>
    <div className="content-form">
      <TextInput label={"パスワード"} type={"password"} value={password} onChange={inputPassword} />
      <TextInput label={"新しい名前"} type={"text"} value={newName} onChange={inputNewName} />
      </div>
      <div className="content-button">
      <PrimaryButton label={"変更する"} />
      </div>
    </>
  )
}

export default ChangeName
