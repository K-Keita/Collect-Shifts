import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const ConfirmDialog = (props) => {
  return (
    <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">登録します。よろしいですか？</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.shiftWeek.map((shift, index) => {
              return (
                <span key={String(index)}>{shift.date} : {shift.name}<br/></span>
              )
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={props.saveShift} color="primary" autoFocus>
            登録
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
