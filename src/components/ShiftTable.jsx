import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import blueGrey from '@material-ui/core/colors/blueGrey';

const useStyles = makeStyles({
  table: {
    minWidth: 720,
    maxWidth: 1000,
    marginLeft: "1%",
    border: "solid 2px #fff",
    borderRadius: 10,
  },
  headCell: {
    background: blueGrey[500],
    border: "solid 1px #fff",
    padding: "12px 0px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: blueGrey[50],
  },
  BodyCell: {
    background: blueGrey[300],
    border: "solid 1px #fff",
    padding: "12px 0px",
    textAlign: "center",
    color: "#fff",
  }
});

const ShiftTable = (props) =>  {
  const classes = useStyles();

  return (
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell width="120px" className={classes.headCell}>名前</TableCell>
            {props.shiftWeek.map(value => {
              return <TableCell width="75px" key={value} className={classes.headCell} >{value}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody >
          {props.shiftList.map((shift, index) => {
            return (
              <TableRow key={String(index)}>
                <TableCell className={classes.BodyCell} component="th" scope="row">
                  {shift.name}
                </TableCell>
                {shift.list.map((value, index) => {
                  return (
                    <TableCell key={String(index)} className={classes.BodyCell}>{value}</TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
  );
}

export default ShiftTable;