import {auth, db, FirebaseTimestamp} from '../../firebase/index';
import { ShiftList } from '../../templates';
import { fetchShiftsListAction, groupInAction } from '../groups/actions';
import {saveGroupId} from '../users/operations';

export const createGroup = (groupName, groupId, administratorPassword, uid, username) => {
  return async (dispatch) => {

    const timestamp = FirebaseTimestamp.now();
    const memberList = {
      name: username,
      id: uid
    }

    const initializeDate = {
      groupName: groupName,
      groupId: groupId,
      password: administratorPassword,
      created_at: timestamp,
      updated_at: timestamp,
      managementUser: [uid],
      memberList: [memberList]
    }

    db.collection("groups").doc(groupId).set(initializeDate)
      .then(() => {
        console.log("ok");
      })
  }
}

export const enterGroup = (groupname, groupId, username, uid) => {
  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const startDate = d.getDate() + ((14 - d.getDay() + 1));
  const firstDate = new Date(y, m - 1, startDate);
  const dateId = `${firstDate.getFullYear()}${firstDate.getMonth()}${firstDate.getDate()}`;
  return async (dispatch) => {
    const id = String(groupId)
    const snapshot = await db.collection("groups").doc(id).get()

    if (!snapshot.exists) {
      alert ("グループが存在しません");
      return false;
    }
    const data = snapshot.data();
    if (data.groupName !== groupname) {
      alert ("グループ名とIDが一致しません");
      return false;
    }
    const memberList = data.memberList;

    const newMember = {
        name: username,
        pass: uid,
    }
    memberList.push(newMember);

    const newData = {
      memberList: memberList,
    }

    dispatch(groupInAction({
      groupId: data.groupId,
      administratorPassword: data.administratorPassword,
      groupName: data.groupName,
      shiftList: data.ShiftList,
      memberList: memberList,
    }))
    const fetch = await dispatch(fetchShifts(groupId, dateId))

    db.collection("groups").doc(id).set(newData, {merge: true})
      .then(() => {
        console.log("oookkk")
        dispatch(saveGroupId(groupId, uid))
      })
  }
}

export const fetchShifts = (groupId, dateId) => {
  if (groupId === "") {
    return false;
  }
  return async (dispatch) => {
    const snapshot = await db.collection("groups").doc(groupId).collection("shiftsList").doc(dateId).get()
    if (!snapshot.exists) {
      const data ={
        shiftList: [],
      }
      db.collection("groups").doc(groupId).collection("shiftsList").doc(dateId).set(data)
        .then(() => {
          console.log("create-table");
        })
    } else {
      const data = snapshot.data();
  
      dispatch(fetchShiftsListAction({
        shiftList: data.shiftList,
        // dateId: data.dateId
      }))
    }
  }
}

export const saveShifts = (groupId, dateId, shift, name) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const doc = await db.collection("groups").doc(groupId).collection("shiftsList").doc(dateId).get()
    const newData = {
      name: name,
      list: shift
    }
    if (doc.exists)  {
      const data = doc.data();
        const shiftList = data.shiftList;
        const arr = [];
        shiftList.map(value => {
          arr.push(value.name);
        })
    if (arr.includes(newData.name)) {
      alert("既に登録されています。")
      return false;
    }

        shiftList.push(newData);

        const updateData = {
          shiftList: shiftList,
          updated_at: timestamp
        }

        
        db.collection("groups").doc(groupId).collection("shiftsList").doc(dateId).set(updateData, {merge: true})
        .then(() => {
  
          dispatch(fetchShiftsListAction({
            shiftList: shiftList,
            // dateId: data.dateId
          }))
        })  
      } else {
        const initializeDate = {
          shiftList: [newData],
          created_at: timestamp,
          updated_at: timestamp
        }
        fetchShiftsListAction({
          shiftList: [newData]
        })

        db.collection("groups").doc(groupId).collection("shiftsList").doc(dateId).set(initializeDate)
          .then(() => {
            console.log('create');
            dispatch(fetchShiftsListAction({
              shiftList: [newData],
              // dateId: data.dateId
            }))
          })
      }
  }
}

export const groupIn = (groupId) => {
  const id = String(groupId)
  return async (dispatch) => {
    const snapshots = await db.collection("groups").where("groupId", "==", id).get()
        snapshots.forEach(doc => {
          const data = doc.data();
          const memberList = data.memberList;
          
          dispatch(groupInAction({
            groupId: data.groupId,
            administratorPassword: data.administratorPassword,
            groupName: data.groupName,
            shiftList: data.ShiftList,
            memberList: memberList,
          }))
        })
  }
}