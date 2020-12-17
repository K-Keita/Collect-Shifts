import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { getGroupIcon, getGroupName, getGroupId } from "../reducks/groups/selectors";
import { getIsSignedIn } from "../reducks/users/selectors";
import { ImagePreview } from "../components";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  iconBox: {
    margin: 0,
  },
  iconText: {
    margin: "-16px 0 0 0",
    fontSize: 8,
  },
  headTitle: {
    margin: "0 10px 0 auto",
    color: blueGrey[50],
    fontWeight: "bold",
  },
  topTitle: {
    margin: "0 10px 0 auto",
    cursor: "pointer",
    color: blueGrey[50],
  },
  root: {
    background: blueGrey[400],
    border: "solid 1px #607d8b",
    padding: 0,
    width: "100%",
    margin: 0,
    top: 0,
    bottom: "auto",
  },
});

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const groupName = getGroupName(selector);
  const isSignedIn = getIsSignedIn(selector);
  const groupIcon = getGroupIcon(selector);
  const groupId = getGroupId(selector)

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
