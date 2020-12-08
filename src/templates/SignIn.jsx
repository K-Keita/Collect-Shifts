import React from 'react'
import { TextInput } from '../components/UIkit'

const SignIn = () => {
  return (
    <div>
      <h2>サインイン</h2>
      <TextInput label={"グループID"} type={"text"} fullWidth={true} />
      <TextInput label={"パスワード"} type={"password"} fullWidth={true} />
    </div>
  )
}

export default SignIn
