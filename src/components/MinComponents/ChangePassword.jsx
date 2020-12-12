import React, {useCallback, useState} from 'react'
import { PrimaryButton, TextInput } from '../components/UIkit';
import {ToggleContent} from '../components/index';

const ChangePassword = () => {
  const [email, setEmail] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  return (
    <>
    <div className="content-form" >
    <TextInput label={"メールアドレス"} type={"email"} value={email} onChange={inputEmail} />
    {/* <TextInput label={"新しいパスワード"} />
    <TextInput label={"新しいパスワード(確認用)"} /> */}
    </div>
    <div className="content-button">
    <PrimaryButton label={"変更メールを送る"} />
    </div>
    </>
  )
}

export default ChangePassword
