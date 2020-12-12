import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

const useStyles = makeStyles({
  dialogTitle: {
    padding: "8px 3px",
    textAlign: "center",
    borderBottom: "solid 1px #eceff1",
    backgroundColor: blueGrey[400],
  },
  dialogText: {
    fontWeight: "bold",
    color: blueGrey[50],
    padding: 3,
  },
  dialog: {
    border: "solid 1px #eceff1",
    backgroundColor: blueGrey[300],
    color: blueGrey[50],
    width: 290,
  }, 
  dialogButton: {
    color: blueGrey[50],
    backgroundColor: blueGrey[500],
    "&:hover": {
      backgroundColor: blueGrey[700],
    }
  }
})

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
        <DialogContent className={classes.dialogContent} >
          <DialogContentText id="alert-dialog-description" className={classes.dialogText}>
            {props.shiftWeek.map((shift, index) => {
              return (
                <span key={String(index)}>{shift.date}({shift.day}) : {shift.name}<br/></span>
              )
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} className={classes.dialogButton}>
            キャンセル
          </Button>
          <Button onClick={props.saveShift} className={classes.dialogButton} autoFocus>
            登録
          </Button>
        </DialogActions>
        </div>
    </Dialog>
  )
}

export default ConfirmDialog
