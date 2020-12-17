import React from "react";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dialog: {
    backgroundColor: blueGrey[300],
    border: "solid 1px #eceff1",
    color: blueGrey[50],
    width: 290,
  },
  dialogText: {
    color: blueGrey[50],
    fontWeight: "bold",
    padding: 3,
  },
  dialogTitle: {
    backgroundColor: blueGrey[400],
    borderBottom: "solid 1px #eceff1",
    padding: "8px 3px",
    textAlign: "center",
  },
  dialogButton: {
    backgroundColor: blueGrey[500],
    color: blueGrey[50],
    "&:hover": {
      backgroundColor: blueGrey[700],
    },
  },
});

const ConfirmDialog = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="title"
      aria-describedby="alert-dialog-description"
    >
      <div className={classes.dialog}>
        <DialogTitle className={classes.dialogTitle} id="title">
          登録します。よろしいですか？
          <span className="side-text">(まだ登録は完了していません)</span>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText
            id="alert-dialog-description"
            className={classes.dialogText}
          >
            {props.shiftWeek.map((shift, index) => {
              return (
                <span key={String(index)}>
                  {shift.date}({shift.day}) : {shift.name.lange}
                  <br />
                </span>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} className={classes.dialogButton}>
            キャンセル
          </Button>
          <Button
            onClick={props.saveShift}
            className={classes.dialogButton}
            autoFocus
          >
            登録
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
