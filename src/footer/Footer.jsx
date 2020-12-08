import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {push} from 'connected-react-router';
import AppBar from '@material-ui/core/AppBar';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme) => ({
  iconBox: {
    width: "20%",
    margin: 0,
  },
  toolBar: {
    padding: 0,
    width: '100%',
  },
  appBar: {
    width: "100%",
    margin: 0,
    top: 'auto',
    bottom: 0,
    
  },
}));

const Footer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);

  const templatePage = [
    {icon: <PeopleIcon />, path: "/list"},
    {icon: <PlaylistAddIcon />, path: "/regist"},
    {icon: <HomeIcon />, path: "/"},
    {icon: <ListAltIcon />, path: "/shift"},
    {icon: <SettingsIcon />, path: "/management"},
  ]

  const linkPage = (path) => {
    dispatch(push(path));
  }

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        {templatePage.map((page,index) => {
          return (
            <IconButton key={String(index)} onClick={() => linkPage(page.path)} color="inherit" className={classes.iconBox} >
              {page.icon}
            </IconButton>
          )
        })}
      </Toolbar>
    </AppBar>
  );
}

export default Footer;