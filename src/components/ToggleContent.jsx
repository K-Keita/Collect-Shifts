import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const ToggleContent = (props) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const icon = open ? (
    <ExpandLessIcon fontSize="large" className="icon-box" />
  ) : (
    <ExpandMoreIcon fontSize="large" className="icon-box" />
  );
  const moreContent = open ? "main-container d-flex" : "d-hidden";

  return (
    <div className="main-container">
      <div className="d-flex f-between" onClick={toggleOpen}>
        <p className="set-title">{props.label}</p>
        {icon}
      </div>
      <div className={moreContent}>{props.content}</div>
    </div>
  );
};

export default ToggleContent;
