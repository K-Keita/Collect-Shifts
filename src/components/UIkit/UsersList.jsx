import React from 'react';
import blueGrey from '@material-ui/core/colors/blueGrey';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: "5px auto 25px",
    maxWidth: 360,
    backgroundColor: blueGrey[400],
    borderRadius: 3,
    padding: 0,
    border: "solid 2px #cfd8dc",
  },
  child: {
    padding: "5px 10px",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 auto",
    padding: 3,
    backgroundColor: blueGrey[500],
    borderBottom: "solid 1px #cfd8dc",
  }
});

const UsersList = (props) => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <p className={classes.title}>{props.title}</p>
      {props.memberList.map((member, index) => {
        return(
        <ListItem key={String(index)} className={classes.child} divider>
          <ListItemText primary={member} />
        </ListItem>
          )
      })}
    </List>
  );
}

export default UsersList;