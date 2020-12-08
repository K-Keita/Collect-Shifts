import React from 'react'
import { UsersList } from '../components/UIkit'

const Members = () => {
  return (
    <div className="main-container">
      <h2>メンバー</h2>
      <h3 className="n-margin main-title">提出者</h3>
      <UsersList />
      <h3 className="n-margin main-title">未提出者</h3>
      <UsersList />
      <UsersList />
    </div>
  )
}

export default Members
