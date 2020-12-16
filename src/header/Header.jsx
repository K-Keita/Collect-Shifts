import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {useDispatch, useSelector} from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey'
import {getGroupIcon, getGroupName} from '../reducks/groups/selectors';
import { getIsSignedIn } from '../reducks/users/selectors';
import { ImagePreview } from '../components';
import {push} from 'connected-react-router'

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
  topTitle: {
    margin: "0 10px 0 auto",
    cursor: "pointer"
  },
  root: {
    background: blueGrey[400],
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
  const groupIcon = getGroupIcon(selector);

  return (
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <div>main title</div>
          {isSignedIn ? (
            <>
          <Typography variant="h6" className={classes.headTitle}>
            {groupName}
          </Typography>
          {groupIcon !== "" && (
            <ImagePreview path={groupIcon.path} />
          )}
          </>
          ): (
           window.location.pathname !== ("/top") && (
          <Typography className={classes.topTitle} onClick={() => dispatch(push("/top"))}>
            タイトル画面
          </Typography>
          )
          )}

        </Toolbar>
      </AppBar>
  );
}

export default Header;