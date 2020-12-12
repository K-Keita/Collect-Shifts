// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";

// const useStyles = makeStyles({
//   formControl: {
//     margin: 0,
//   },
//   dropdownStyle: {
//     maxHeight: 300,
//   },
// });

// const SelectBox = (props) => {
//   const classes = useStyles();

//   const handleChange = (event) => {
//     props.setState(event.target.value);
//   };

//   return (
//     <FormControl className={classes.formControl}>
//       <InputLabel id="select-label">{props.label}</InputLabel>
//       <Select
//         labelId="select-label"
//         id="select"
//         value={props.state}
//         onChange={handleChange}
//         style={{ width: props.width }}
//         MenuProps={{
//           anchorOrigin: {
//             vertical: "bottom",
//             horizontal: "left",
//           },
//           transformOrigin: {
//             vertical: "top",
//             horizontal: "left",
//           },
//           getContentAnchorEl: null,
//           classes: {
//             paper: classes.dropdownStyle,
//           },
//         }}
//       >
//         {props.arr.map((value, index) => {
//           return (
//             <MenuItem key={index} value={value}>
//               {value}
//             </MenuItem>
//           );
//         })}
//       </Select>
//     </FormControl>
//   );
// };

// export default SelectBox;
