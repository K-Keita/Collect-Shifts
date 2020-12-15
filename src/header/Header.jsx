import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../reducks/users/operations';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import blueGrey from '@material-ui/core/colors/blueGrey'
import {getGroupName} from '../reducks/groups/selectors';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getIsSignedIn } from '../reducks/users/selectors';

const useStyles = makeStyles((theme) => ({
  iconBox: {
    margin: 0,
  },
  iconText: {
    margin: "-16px 0 0 0",
    fontSize: 8,
  },
  headTitle: {
    margin: "0 10px 0 auto"
  },
  root: {
    background: blueGrey[500],
    padding: 0,
    width: "100%",
    margin: 0,
    top: 0,
    bottom: "auto",
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state)

  const groupName = getGroupName(selector);
  const isSignedIn = getIsSignedIn(selector);

  return (
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <div>main title</div>
          <Typography variant="h6" className={classes.headTitle}>
            {groupName}
          </Typography>
            {isSignedIn && (
              
              <div className={classes.iconBox}>
        <IconButton className={classes.icon} onClick={() => dispatch(signOut())} color="inherit">
              <ExitToAppIcon />
            </IconButton>
            <p className={classes.iconText}>ログアウト</p>
          </div>
              )}
        </Toolbar>
      </AppBar>
  );
}

export default Header;