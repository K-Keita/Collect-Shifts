import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { PrimaryButton, TextInput } from '../components/UIkit';
import {ToggleContent} from '../components/index';
import {registManage} from '../reducks/groups/operations';
import {getUserId} from '../reducks/users/selectors';
import {getGroupId} from '../reducks/groups/selectors';

const RegistManage = () => {
  const dispatch = useDispatch();
  const [managePassword, setManagePassword] = useState("");
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const groupId = getGroupId(selector);

  const inputManagePassword = useCallback((event) => {
    setManagePassword(event.target.value)
  }, [setManagePassword]);

  return (
    <>
    <div className="content-form">
    <TextInput label={"管理者パスワード"} type={"text"} value={managePassword} onChange={inputManagePassword} />
    </div>
    <div className="content-button">
    <PrimaryButton label={"登録する"} onClick={() => dispatch(registManage(managePassword, uid, groupId))} />
    </div>
  </>
  )
}

export default RegistManage
