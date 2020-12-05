import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const PrimaryButton = (props) => {
  return (
    <div style={{width: props.width}} className="m-center">
      <Button variant="outlined" onClick={props.onClick} fullWidth={props.fullWidth}>{props.label}</Button>
    </div>
  );
}

export default PrimaryButton;