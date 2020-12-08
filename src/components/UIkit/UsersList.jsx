import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: "0 auto",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  child: {
    padding: 5,
  }
}));

const UsersList = () => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <ListItem className={classes.child} divider>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem className={classes.child} divider>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem className={classes.child} divider>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem className={classes.child} divider>
        <ListItemText primary="Inbox" />
      </ListItem>
    </List>
  );
}

export default UsersList;