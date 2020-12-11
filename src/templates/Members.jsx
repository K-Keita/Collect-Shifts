import { Divider } from '@material-ui/core';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { UsersList } from '../components/UIkit'
import {getMemberList, getShiftList} from '../reducks/groups/selectors';

const getName = (arr, newArr) => {
  arr.map(value => {
    newArr.push(value.name)
  })
}

const Members = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);

  const memberList = getMemberList(selector);
  const shiftList = getShiftList(selector);
  const member = [];
  const shift = [];

  getName(memberList, member);
  getName(shiftList, shift);

  const notHandInShift = [...member, ...shift].filter(value => !member.includes(value) || !shift.includes(value))
  
  const handInShift = [...new Set(member)].filter(value => shift.includes(value))

  return (
    <div className="main-container">
      <h2>メンバー</h2>
      <UsersList memberList={handInShift} title={"提出者"} />
      <Divider />
      <UsersList memberList={notHandInShift} title={"未提出者"}/>
    </div>
  )
}

export default Members
