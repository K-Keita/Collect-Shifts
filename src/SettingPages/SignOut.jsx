import React from 'react'
import {useDispatch} from 'react-redux'
import { PrimaryButton } from '../components/UIkit'
import {signOut} from '../reducks/users/operations'

const SignOut = () => {
  const dispatch = useDispatch()

  return (
    <div className="content-button">
      <PrimaryButton label={"ログアウト"} onClick={() => dispatch(signOut())} />
    </div>
  )
}

export default SignOut
