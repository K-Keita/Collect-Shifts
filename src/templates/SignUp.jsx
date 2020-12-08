import React, {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import { Divider } from '@material-ui/core'
import { TextInput, PrimaryButton } from '../components/UIkit/index'
import {signUp} from '../reducks/users/operations';

const CreateGroupPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''), 
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('');

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value);
  }, [setUsername])
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail])
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword])
  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value);
  }, [setConfirmPassword])

  return (
    <div className="main-container"> 
      <h2>アカウント登録</h2>
      <TextInput label={"ユーザー名"} type={"text"} fullWidth={true} value={username} onChange={inputUsername} />
      <Divider />
      <TextInput label={"メールアドレス"} type={"email"} fullWidth={true} value={email} onChange={inputEmail} />
      <Divider />
      <TextInput label={"パスワード"} type={"password"} fullWidth={true} value={password} onChange={inputPassword} />
      <Divider />
      <TextInput label={"パスワード(確認用)"} type={"password"} fullWidth={true} value={confirmPassword} onChange={inputConfirmPassword} />
      <PrimaryButton onClick={() => dispatch(signUp(username, email, password, confirmPassword))} label={"登録"} width={"70%"} fullWidth={true} />
    </div>
  )
}

export default CreateGroupPage
