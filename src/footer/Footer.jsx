import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import AppBar from "@material-ui/core/AppBar";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { useSelector } from "react-redux";
import { getIsSignedIn } from "../reducks/users/selectors";
import {getGroupId} from '../reducks/groups/selectors'

const useStyles = makeStyles({
  iconBox: {
    width: "20%",
    margin: 0,
    borderRight: "inset 1px #37474f",
  },
  icon: {
    width: "100%",
  },
  iconText: {
    textAlign: "center",
    margin: "-16px 0 0 0",
    fontSize: 10,
  },
  toolBar: {
    padding: 0,
    width: "100%",
  },
  appBar: {
    width: "100%",
    margin: 0,
    top: "auto",
    bottom: 0,
    background: blueGrey[400],
    borderTop: "solid 2px #607d8b",
    boxSizing: "border-box",
  },
});

const Footer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const groupId = getGroupId(selector);

  const templatePage = [
    { icon: <PeopleIcon />, path: "/list", text: "メンバー" },
    { icon: <PlaylistAddIcon />, path: "/regist", text: "シフト登録" },
    { icon: <HomeIcon />, path: "/", text: "ホーム" },
    { icon: <ListAltIcon />, path: "/shift", text: "シフト一覧" },
    { icon: <SettingsIcon />, path: "/management", text: "設定" },
  ];

  const linkPage = (path) => {
    dispatch(push(path));
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        {(isSignedIn && groupId !== "") &&
          templatePage.map((page, index) => {
            return (
              <div key={String(index)} className={classes.iconBox}>
                <IconButton
                  key={String(index)}
                  className={classes.icon}
                  onClick={() => linkPage(page.path)}
                  color="inherit"
                >
                  {page.icon}
                </IconButton>
                <p className={classes.iconText}>{page.text}</p>
              </div>
            );
          })}
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
