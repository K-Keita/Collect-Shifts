import React, {useCallback, useState} from 'react'
import { PrimaryButton, TextInput } from '../components/UIkit';
import {ToggleContent} from '../components/index';

const RegistManage = () => {
  const [managePassword, setManagePassword] = useState("");

  const inputManagePassword = useCallback((event) => {
    setManagePassword(event.target.value)
  }, [setManagePassword]);

  return (
    <>
    <div className="content-form">
    <TextInput label={"管理者パスワード"} type={"text"} value={managePassword} onChange={inputManagePassword} />
    </div>
    <div className="content-button">
    <PrimaryButton label={"登録する"} />
    </div>
  </>
  )
}

export default RegistManage
