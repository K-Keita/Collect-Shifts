import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getUserId, getUserName } from '../reducks/users/selectors';
import {getGroupId} from '../reducks/groups/selectors';
import {exitGroup} from '../reducks/groups/operations';
import {PrimaryButton} from '../components/UIkit/index';

const ExitGroup = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);

  const username = getUserName(selector)
  const groupId = getGroupId(selector);
  const uid = getUserId(selector)
  console.log(uid, username)


  return (
    <div className="content-button">
        <PrimaryButton label={"退会する"} onClick={() => dispatch(exitGroup(uid, groupId, username))} />
    </div>
  )
}

export default ExitGroup
