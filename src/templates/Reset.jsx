import React, {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux';
import {resetPassword} from '../reducks/users/operations'
import { TextInput, PrimaryButton } from '../components/UIkit';
import {push} from 'connected-react-router';

const Reset = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail])


  return (
    <div className="main-container">
      <h2>パスワードのリセット</h2>
      <TextInput label={"メールアドレス"} value={email} type={"email"} onChange={inputEmail} />
      <PrimaryButton label={"リセット用のメールを送る"} width={"70%"} onClick={() => dispatch(resetPassword(email))} fullWidth={true} />
      <div className="midium-space" />
      <div className="w-border" />
      <PrimaryButton width={"50%"} fullWidth={true} label={"ログイン画面に戻る"} onClick={() => dispatch(push("/signin"))} />
    </div>
  )
}

export default Reset
