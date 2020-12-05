import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {push} from 'connected-react-router';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  iconBox: {
    width: "20%",
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

const Footer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer" className={classes.iconBox} >
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit" className={classes.iconBox} >
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit" className={classes.iconBox} >
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit" className={classes.iconBox} >
            <SearchIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(push("/list"))} edge="end" color="inherit" className={classes.iconBox}>
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Footer;