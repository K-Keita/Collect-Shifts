import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 720,
    padding: 10,
  },
  tableCell: {
    padding: "12px 6px",
    textAlign: "center",
  }
});


const ShiftTable = () =>  {
  const classes = useStyles();
  
  const shiftArr = ["10-14", "10-14", "10-18", "休み", "10-15", "休み", "10-L"]
  function createData(name, mon, tues, wednes, thurs,  fri, satur, sun ) {
    return { name, mon, tues, wednes, thurs, fri, satur, sun };
  }
  
  const rows = [
    createData('あいうえ', "10.5-10.5", 6.0, 24, 4.0, 5, "10-14", "休み"),
    createData('かきくけこ', 237, "10-14", 37, 4.3, "10-14", "休み"),
    createData('さしすせそた', 262, 16.0, 24, 6.0, "10-14", "休み"),
    createData('なにぬねのはひ', 305, "10-L", 67, 4.3, "10-14", "休み"),
    createData('ああああああああ', 356, 16.0, 49, 3.9, "休み", "10-L"),
    createData('あああ', 356, 16.0, 49, 3.9, "休み", "10-18"),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell width="120px" className={classes.tableCell}>userName</TableCell>
            <TableCell width="75px" className={classes.tableCell}>月</TableCell>
            <TableCell width="75px" className={classes.tableCell}>火</TableCell>
            <TableCell width="75px" className={classes.tableCell}>水</TableCell>
            <TableCell width="75px" className={classes.tableCell}>木</TableCell>
            <TableCell width="75px" className={classes.tableCell}>金</TableCell>
            <TableCell width="75px" className={classes.tableCell}>土</TableCell>
            <TableCell width="75px" className={classes.tableCell}>日</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableCell}>
          {rows.map((row) => (
            <TableRow className={classes.tableCell} key={row.name}>
              <TableCell className={classes.tableCell} component="th" scope="row">
                {row.name}
              </TableCell>
              {shiftArr.map((value, index) => {
                <TableCell key={index} className={classes.tableCell}>{value}</TableCell>
              })}
              <TableCell className={classes.tableCell}>{row.mon}</TableCell>
              <TableCell className={classes.tableCell}>{row.tues}</TableCell>
              <TableCell className={classes.tableCell}>{row.wednes}</TableCell>
              <TableCell className={classes.tableCell}>{row.thurs}</TableCell>
              <TableCell className={classes.tableCell}>{row.fri}</TableCell>
              <TableCell className={classes.tableCell}>{row.satur}</TableCell>
              <TableCell className={classes.tableCell}>{row.sun}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ShiftTable;