import React from "react";
import { Divider } from "@material-ui/core";
import { useSelector } from "react-redux";
import { UsersList } from "../components/UIkit";
import { getMemberList, getShiftList } from "../reducks/groups/selectors";

const getName = (arr, newArr) => {
  arr.map((value) => {
    return newArr.push(value.name);
  });
};
const getManage = (arr, newArr) => {
  arr.map((value) => {
    if (value.manage) {
      return newArr.push(value.name);
    }
  });
};

const Members = () => {
  const selector = useSelector((state) => state);

  const memberList = getMemberList(selector);
  const shiftList = getShiftList(selector);

  const member = [];
  const shift = [];
  const manager = [];

  getName(memberList, member);
  getName(shiftList, shift);
  getManage(memberList, manager);

  const handInShift = [...new Set(member)].filter((value) =>
    shift.includes(value)
  );

  const notHandInShift = [...member, ...shift].filter(
    (value) =>
      (!member.includes(value) || !shift.includes(value)) &&
      !manager.includes(value)
  );

  return (
    <div className="main-container">
      <h2>メンバー: {member.length}</h2>
      <UsersList memberList={manager} title={"管理者"} />
      <UsersList memberList={handInShift} title={"提出者"} />
      <Divider />
      <UsersList memberList={notHandInShift} title={"未提出者"} />
    </div>
  );
};

export default Members;
