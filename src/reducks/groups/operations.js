import {auth, db, FirebaseTimestamp} from '../../firebase/index';

export const createGroup = (groupName, groupId, administratorPassword, uid, username) => {
  return async (dispatch) => {

    const timestamp = FirebaseTimestamp.now()

    const initializeDate = {
      groupName: groupName,
      groupId: groupId,
      password: administratorPassword,
      created_at: timestamp,
      updated_at: timestamp,
      managementUser: [uid],
      memberList: [{
        name: username,
        pass: uid
      }]
    }

    db.collection("groups").doc(groupId).set(initializeDate)
      .then(() => {
        console.log("ok");
      })
  }
}

export const enterGroup = (groupId, newName, newId) => {
  return async (dispatch) => {
    const id = String(groupId)
    db.collection("groups").doc(id).get()
      .then(snapshot => {
        const data = snapshot.data();
        const memberList = data.memberList;

        const newMember = {
            name: newName,
            pass: newId,
        }
        memberList.push(newMember);

        const newData = {
          memberList: memberList,
        }

        db.collection("groups").doc(id).set(newData, {merge: true})
          .then(() => {
            console.log("oookkk")
          })
      })
  }
}