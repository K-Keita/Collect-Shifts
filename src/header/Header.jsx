import React from "react";
import AppBar from "@material-ui/core/AppBar";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  getGroupIcon,
  getGroupId,
  getGroupName,
} from "../reducks/groups/selectors";
import { getIsSignedIn } from "../reducks/users/selectors";
import { ImagePreview } from "../components";
import { makeStyles } from "@material-ui/core/styles";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  headTitle: {
    color: blueGrey[50],
    fontWeight: "bold",
    margin: "0 10px 0 auto",
  },
  iconBox: {
    margin: 0,
  },
  iconText: {
    fontSize: 8,
    margin: "-16px 0 0 0",
  },
  topTitle: {
    color: blueGrey[50],
    cursor: "pointer",
    margin: "0 10px 0 auto",
  },
  root: {
    background: blueGrey[400],
    bottom: "auto",
    border: "solid 1px #607d8b",
    margin: 0,
    padding: 0,
    top: 0,
    width: "100%",
  },
});

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const groupIcon = getGroupIcon(selector),
    groupId = getGroupId(selector),
    groupName = getGroupName(selector);

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <div>main title</div>
        {groupId !== "" ? (
          <>
            <Typography variant="h6" className={classes.headTitle}>
              {groupName}
            </Typography>
            {groupIcon !== "" && <ImagePreview path={groupIcon.path} />}
          </>
        ) : (
          window.location.pathname !== "/top" && (
            <Typography
              className={classes.topTitle}
              onClick={() => dispatch(push("/top"))}
            >
              Top-Page
            </Typography>
          )
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
